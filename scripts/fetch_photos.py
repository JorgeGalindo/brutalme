#!/usr/bin/env python3
"""Fetch Wikimedia Commons photos for buildings in src/data/buildings.js."""
import re, json, os, sys, subprocess, urllib.parse, urllib.request, time

ROOT = '/Users/jorgegalindo/Desktop/projects/brutalme'
OUT_DIR = os.path.join(ROOT, 'public', 'buildings')
os.makedirs(OUT_DIR, exist_ok=True)

with open(os.path.join(ROOT, 'src/data/buildings.js')) as f:
    content = f.read()

buildings = []
for line in content.split('\n'):
    s = line.strip()
    if not s.startswith('{ id:'):
        continue
    def g(k):
        m = re.search(rf'{k}:\s*"([^"]*)"', line)
        return m.group(1) if m else None
    buildings.append({
        'id': g('id'),
        'name': g('name'),
        'architect': g('architect') or '',
        'wikimedia': g('wikimedia'),
    })

print(f'Total buildings: {len(buildings)}', file=sys.stderr)

UA = 'brutalme-importer/1.0 (contact via github)'
BAD = re.compile(r'interior|detalle|plano|mapa|portrait|retrato|logo|escudo', re.I)

def api_search(query):
    params = {
        'action': 'query',
        'format': 'json',
        'list': 'search',
        'srsearch': query,
        'srnamespace': '6',
        'srlimit': '8',
    }
    url = 'https://commons.wikimedia.org/w/api.php?' + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={'User-Agent': UA})
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            data = json.loads(r.read())
        return [h['title'] for h in data.get('query', {}).get('search', [])]
    except Exception as e:
        print(f'  search error: {e}', file=sys.stderr)
        return []

def score(title, name, architect):
    t = title.lower()
    if BAD.search(t):
        return -100
    s = 0
    if t.endswith('.jpg') or t.endswith('.jpeg'):
        s += 5
    elif t.endswith('.png'):
        s += 1
    else:
        return -100
    # tokens from name
    toks = re.findall(r'\w+', name.lower())
    toks = [x for x in toks if len(x) > 3]
    for tok in toks:
        if tok in t:
            s += 2
    arch_toks = re.findall(r'\w+', architect.lower())
    arch_toks = [x for x in arch_toks if len(x) > 4]
    for tok in arch_toks:
        if tok in t:
            s += 1
    if 'madrid' in t:
        s += 1
    return s

def download(filename, out_path):
    clean = filename.replace('File:', '').replace(' ', '_')
    url = f'https://commons.wikimedia.org/wiki/Special:FilePath/{urllib.parse.quote(clean)}?width=1200'
    try:
        r = subprocess.run(
            ['curl', '-sSL', '-A', UA, '-o', out_path, '--max-time', '45', url],
            capture_output=True
        )
        if r.returncode != 0:
            return False
        if not os.path.exists(out_path):
            return False
        size = os.path.getsize(out_path)
        if size < 10000:
            os.remove(out_path)
            return False
        ft = subprocess.run(['file', out_path], capture_output=True, text=True).stdout
        if 'JPEG' not in ft and 'PNG' not in ft and 'image' not in ft.lower():
            os.remove(out_path)
            return False
        return True
    except Exception as e:
        print(f'  download error: {e}', file=sys.stderr)
        return False

succeeded = []

for i, b in enumerate(buildings):
    bid = b['id']
    out_path = os.path.join(OUT_DIR, f'{bid.lower()}.jpg')
    if os.path.exists(out_path) and os.path.getsize(out_path) > 10000:
        print(f'[{i+1}/{len(buildings)}] {bid}: already exists', file=sys.stderr)
        succeeded.append(bid)
        continue

    name = b['name']
    architect = b['architect']
    print(f'[{i+1}/{len(buildings)}] {bid}: {name}', file=sys.stderr)

    # candidate file names to try (in order)
    candidates = []

    # Hint from buildings.js
    if b.get('wikimedia'):
        candidates.append('File:' + b['wikimedia'])

    # Build search queries
    # Clean name: strip parens content, quotes
    clean_name = re.sub(r"'[^']*'", '', name)
    clean_name = re.sub(r'—.*$', '', clean_name).strip()
    clean_name = re.sub(r'\(.*?\)', '', clean_name).strip()

    queries = []
    queries.append(f'"{clean_name}" Madrid')
    # arch last name
    arch_last = ''
    if architect:
        m = re.match(r'([^,()]+)', architect)
        if m:
            parts = m.group(1).strip().split()
            if parts:
                arch_last = parts[-1]
    if arch_last:
        queries.append(f'{clean_name} {arch_last}')
    queries.append(f'{clean_name} Madrid')

    seen = set()
    for q in queries:
        if len(candidates) >= 12:
            break
        results = api_search(q)
        for title in results:
            if title in seen:
                continue
            seen.add(title)
            candidates.append(title)
        time.sleep(0.2)

    # Score & sort
    scored = [(score(t, clean_name, architect), t) for t in candidates]
    scored.sort(reverse=True)
    # Keep the hinted one always first (if any)
    tried = 0
    ok = False
    for sc, title in scored:
        if sc < 0:
            continue
        if tried >= 4:
            break
        tried += 1
        print(f'    try: {title} (score {sc})', file=sys.stderr)
        if download(title, out_path):
            print(f'    OK', file=sys.stderr)
            succeeded.append(bid)
            ok = True
            break
    if not ok:
        print(f'    SKIP', file=sys.stderr)
    time.sleep(0.15)

print(json.dumps(succeeded))
with open('/tmp/brutalme_succeeded.json', 'w') as f:
    json.dump(succeeded, f)
print(f'Succeeded: {len(succeeded)}/{len(buildings)}', file=sys.stderr)
