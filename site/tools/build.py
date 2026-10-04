#!/usr/bin/env python3
"""Gera os blocos de conteúdo compartilhados nas 4 páginas a partir de content/content.json.

Edite o texto em content/content.json e rode:  python3 tools/build.py
Os blocos ficam entre marcadores <!-- gv:nome --> ... <!-- /gv:nome --> em cada página;
o script também renumera os rótulos das seções (01, 02, ...).
"""
import html
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
CONTENT = json.loads((ROOT / 'content' / 'content.json').read_text())
PAGES = [('index.html', 'pt', 'desktop'), ('index-en.html', 'en', 'desktop'),
         ('mobile.html', 'pt', 'mobile'), ('mobile-en.html', 'en', 'mobile')]
e = html.escape


def topbar(label):
    return f'<div class="granovetter-topbar"><span>00</span><span class="granovetter-rule"></span><span>{e(label)}</span></div>'


def eyebrow(label):
    return f'<div class="eyebrow"><b>00</b><span class="ln"></span>{e(label)}</div>'


def shots(c, lang, cls):
    figs = ''.join(
        f'<figure><img src="./assets/media/etapa-{key}-{lang}.webp" alt="{e(alt)}" loading="lazy" width="1200" height="810"><figcaption>{e(cap)}</figcaption></figure>'
        for key, cap, alt in c['shots'])
    return f'<h3 class="{cls}-shots-title">{e(c["shots_title"])}</h3><div class="{cls}-shots">{figs}</div><p class="{cls}-shots-note">{e(c["shots_note"])}</p>'


def case(d, lang, variant):
    c = d['case']
    if variant == 'desktop':
        stats = ''.join(f'<div class="granovetter-case-stat"><span class="granovetter-case-n">{e(n)}</span><span class="granovetter-case-l">{e(l)}</span></div>' for n, l in c['stats'])
        return (f'<section class="granovetter-case module granovetter-light" data-bg="light" data-s-i="data-s-i" id="caso">\n'
                f'<div class="-w granovetter-case-inner">\n{topbar(c["top"])}\n'
                f'<h2 class="granovetter-case-title">{e(c["title"])}</h2>\n<p class="granovetter-case-lead">{e(c["lead"])}</p>\n'
                f'<div class="granovetter-case-grid">{stats}</div>\n<p class="granovetter-case-note">{e(c["note"])}</p>\n'
                f'{shots(c, lang, "granovetter-case")}\n</div>\n</section>')
    stats = ''.join(f'<div class="cstat"><span class="cn">{e(n)}</span><span class="cl">{e(l)}</span></div>' for n, l in c['stats'])
    return (f'<section class="wrap reveal case" id="caso">\n    {eyebrow(c["top"])}\n    <h2>{e(c["title"])}</h2>\n'
            f'    <p class="body">{e(c["lead"])}</p>\n    <div class="casegrid">{stats}</div>\n    <p class="note">{e(c["note"])}</p>\n'
            f'    {shots(c, lang, "case")}\n  </section>')


def who(d, lang, variant):
    w = d['who']
    if variant == 'desktop':
        items = ''.join(f'<li class="granovetter-who-item"><h3>{e(t)}</h3><p>{e(x)}</p></li>' for t, x in w['items'])
        return (f'<section class="granovetter-who module granovetter-light" data-bg="light" data-s-i="data-s-i" id="para-quem">\n'
                f'<div class="-w granovetter-who-inner">\n{topbar(w["top"])}\n<h2 class="granovetter-case-title">{e(w["title"])}</h2>\n'
                f'<ul class="granovetter-who-grid">{items}</ul>\n</div>\n</section>')
    items = ''.join(f'<li><h3>{e(t)}</h3><p>{e(x)}</p></li>' for t, x in w['items'])
    return f'<section class="wrap reveal" id="para-quem">\n    {eyebrow(w["top"])}\n    <h2>{e(w["title"])}</h2>\n    <ul class="who">{items}</ul>\n  </section>'


def faq(d, lang, variant):
    f = d['faq']
    if variant == 'desktop':
        qs = ''.join(f'<details class="granovetter-faq-item"><summary>{e(q)}</summary><p>{e(a)}</p></details>' for q, a in f['items'])
        return (f'<section class="granovetter-faq module granovetter-dark" data-bg="dark" data-s-i="data-s-i" id="faq">\n'
                f'<div class="-w granovetter-faq-inner">\n{topbar(f["top"])}\n<h2 class="granovetter-faq-title">{e(f["title"])}</h2>\n'
                f'<div class="granovetter-faq-list">{qs}</div>\n</div>\n</section>')
    qs = ''.join(f'<details><summary>{e(q)}</summary><p>{e(a)}</p></details>' for q, a in f['items'])
    return f'<section class="wrap reveal" id="faq">\n    {eyebrow(f["top"])}\n    <h2>{e(f["title"])}</h2>\n    <div class="faq">{qs}</div>\n  </section>'


def creds(d, lang, variant):
    cls = 'granovetter-creds' if variant == 'desktop' else 'creds'
    items = ''.join(f'<div><dt>{e(n)}</dt><dd>{e(l)}</dd></div>' for n, l in d['creds'])
    return f'<dl class="{cls}" aria-label="{e(d["creds_label"])}">{items}</dl>'


def faq_jsonld(d):
    data = {'@context': 'https://schema.org', '@type': 'FAQPage', 'mainEntity': [
        {'@type': 'Question', 'name': q, 'acceptedAnswer': {'@type': 'Answer', 'text': a}} for q, a in d['faq']['items']]}
    return '<script type="application/ld+json">' + json.dumps(data, ensure_ascii=False) + '</script>'


BLOCKS = {'caso': case, 'para-quem': who, 'faq': faq, 'creds': creds}


def replace_block(s, name, new):
    pat = re.compile(rf'<!-- gv:{re.escape(name)} -->.*?<!-- /gv:{re.escape(name)} -->', re.S)
    if not pat.search(s):
        raise SystemExit(f'marcador gv:{name} não encontrado')
    return pat.sub(lambda _: f'<!-- gv:{name} -->{new}<!-- /gv:{name} -->', s, count=1)


def renumber(s, variant):
    if variant == 'mobile':
        k = [0]
        def ren(m):
            k[0] += 1
            return f'<div class="eyebrow"><b>{k[0]:02d}</b>'
        return re.sub(r'<div class="eyebrow"><b>\d\d</b>', ren, s)
    n = 0
    for sid in [m.group(1) for m in re.finditer(r'<section[^>]*id="([^"]+)"', s)]:
        st = s.index(f'id="{sid}"')
        en = s.index('</section>', st)
        sec = s[st:en]
        m = re.search(r'>(\d\d)</span>', sec)
        if not m:
            continue
        n += 1
        s = s[:st] + sec[:m.start()] + f'>{n:02d}</span>' + sec[m.end():] + s[en:]
    return s


def main():
    for fname, lang, variant in PAGES:
        path = ROOT / fname
        s = path.read_text()
        d = CONTENT[lang]
        for name, fn in BLOCKS.items():
            s = replace_block(s, name, fn(d, lang, variant))
        if variant == 'desktop':
            s = replace_block(s, 'faq-jsonld', faq_jsonld(d))
        s = renumber(s, variant)
        path.write_text(s)
        print('ok', fname)


if __name__ == '__main__':
    main()
