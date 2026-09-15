#!/usr/bin/env python3
"""Create wiki SVG diagrams using unmodified textures from a Minecraft client jar.

Usage: python3 scripts/generate-teleportation-diagrams.py /path/to/minecraft-client.jar
Minecraft texture artwork belongs to Mojang Studios. The layout and annotations
are authored for Fixed by Design. These are diagrams, not game screenshots.
"""
import argparse
import base64
from html import escape
from pathlib import Path
from zipfile import ZipFile

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('client_jar', type=Path)
args = parser.parse_args()
output = Path(__file__).resolve().parents[1] / 'public/media/teleportation'
output.mkdir(parents=True, exist_ok=True)
textures = {
    'gold': 'block/gold_block', 'emerald': 'block/emerald_block',
    'lodestone': 'block/lodestone_top', 'lodestone-side': 'block/lodestone_side',
    'stone': 'block/polished_andesite', 'wool': 'block/white_wool',
    'compass': 'item/compass_16', 'star': 'item/nether_star',
    'steve': 'entity/player/wide/steve', 'alex': 'entity/player/slim/alex',
    'villager': 'entity/villager/villager',
}
with ZipFile(args.client_jar) as jar:
    encoded = {key: base64.b64encode(jar.read('assets/minecraft/textures/' + path + '.png')).decode()
               for key, path in textures.items()}


def text(x, y, value, size=22, color='#f5f0ff', weight=500, anchor='start', extra=''):
    return f'<text x="{x}" y="{y}" font-size="{size}" fill="{color}" font-weight="{weight}" text-anchor="{anchor}" {extra}>{escape(value)}</text>'


def line(points, color='#a89abe', width=2, extra=''):
    return f'<polyline points="{points}" fill="none" stroke="{color}" stroke-width="{width}" stroke-linecap="round" stroke-linejoin="round" {extra}/>'


def rect(x, y, w, h, fill, radius=0, extra=''):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{radius}" fill="{fill}" {extra}/>'


def sprite(name, x, y, w, h=None):
    return f'<use href="#tex-{name}" transform="translate({x} {y}) scale({w / 16} {(h if h is not None else w) / 16})"/>'


def face(name, p, u, v, shade=0):
    return (f'<g transform="matrix({u[0]/16} {u[1]/16} {v[0]/16} {v[1]/16} {p[0]} {p[1]})">'
            f'<use href="#tex-{name}"/>' + rect(0, 0, 16, 16, '#080715', extra=f'opacity="{shade}"')
            + rect(0, 0, 16, 16, 'none', extra='stroke="#42342e" stroke-width="0.23"') + '</g>')


def cube(x, y, top, side=None):
    side = side or top
    return (face(side, (x+34, y+18), (-34, 18), (0, 34), .30)
            + face(side, (x-34, y+18), (34, 18), (0, 34), .13)
            + face(top, (x, y), (34, 18), (-34, 18)))


def finish(name, height, title, description, content, used):
    defs = ''.join(f'<image id="tex-{key}" width="{64 if key in ["steve", "alex", "villager"] else 16}" height="{64 if key in ["steve", "alex", "villager"] else 16}" href="data:image/png;base64,{encoded[key]}" image-rendering="pixelated"/>' for key in used)
    width = 560 if name.endswith("-mobile.svg") else 960
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}" role="img" aria-labelledby="title description">
<title id="title">{escape(title)}</title><desc id="description">{escape(description)}</desc>
<metadata>Fixed by Design schematic. Unmodified Minecraft textures: Mojang Studios. Not an in-game screenshot.</metadata>
<defs>{defs}<linearGradient id="background" x2="0.8" y2="1"><stop stop-color="#21153e"/><stop offset="1" stop-color="#100c28"/></linearGradient></defs>
<g font-family="Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif">
{rect(1, 1, width-2, height-2, 'url(#background)', 18, 'stroke="#47345e" stroke-width="2"')}
{content}
</g></svg>'''
    assert '\u2014' not in svg
    (output / name).write_text(svg)
    print(name, len(svg), 'bytes')


# Platform: an isometric view and a literal side section show the hidden centre block.
c = text(36, 46, 'THE PLATFORM', 16, '#d9b66b', 700, extra='letter-spacing="2"')
c += text(36, 84, '49 matching blocks. One Lodestone.', 30, weight=650)
for x, z in sorted(((x,z) for x in range(7) for z in range(7)), key=lambda p: (sum(p), p[0])):
    c += cube(460+(x-z)*34, 142+(x+z)*18, 'gold')
c += cube(460, 142+6*18-34, 'lodestone', 'lodestone-side')
c += line('492,230 605,191 667,191', '#d6c7ed')
c += text(680, 198, 'Lodestone', 23, weight=600)
c += text(680, 225, 'on top of the centre', 17, '#bcb0d0')
c += line('207,314 207,330 445,456 445,440', '#d9b66b', 2)
c += text(302, 406, '7 blocks', 19, '#e9c77d', anchor='middle', extra='transform="rotate(28 302 406)"')
c += line('475,440 475,456 713,330 713,314', '#d9b66b', 2)
c += text(621, 406, '7 blocks', 19, '#e9c77d', anchor='middle', extra='transform="rotate(-28 621 406)"')
c += line('36,481 924,481', '#49375e', 1)
c += text(54, 515, 'SIDE VIEW', 15, '#bcb0d0', 650, extra='letter-spacing="1.5"')
for i in range(7):
    c += sprite('gold', 54+i*48, 580, 48)
    c += rect(54+i*48, 580, 48, 48, 'none', extra='stroke="#644a29" stroke-width="1"')
c += sprite('lodestone-side', 54+3*48, 532, 48)
c += line('250,547 414,547 464,538', '#d6c7ed')
c += text(484, 547, 'One block above the foundation', 21)
c += line('248,605 431,646 464,626', '#d9b66b')
c += text(484, 610, 'The centre block stays in place.', 21)
c += text(484, 638, 'A single layer, including all 49 blocks.', 18, '#bcb0d0')
finish('platform.svg', 682, 'A single-layer teleportation platform', 'Isometric view of a seven by seven gold foundation with a Lodestone above its centre. A side view shows the gold block underneath the Lodestone.', c, ['gold','lodestone','lodestone-side'])

# Covered foundation: all materials stay visible in a labelled cross-section.
c = text(36, 46, 'A COVERED PLATFORM', 16, '#d9b66b', 700, extra='letter-spacing="2"')
c += text(36, 84, 'Build your floor over the foundation.', 29, weight=650)
for i in range(7):
    x=60+i*48
    c += sprite('gold', x, 244, 48)
    c += sprite('lodestone-side' if i == 3 else 'stone', x, 196, 48)
    if i != 3: c += sprite('wool', x, 193, 48, 3)
    c += rect(x, 244, 48, 48, 'none', extra='stroke="#644a29" stroke-width="1"')
c += line('53,175 402,175', '#92ebbf', 3, 'stroke-dasharray="2 11"')
c += line('227,213 454,134 523,134', '#d6c7ed')
c += text(540, 141, 'Visible Lodestone', 22, weight=600)
c += line('370,215 488,210 523,210', '#bcb0d0')
c += text(540, 217, 'Decorative blocks and carpet', 21)
c += line('370,268 490,282 523,282', '#d9b66b')
c += text(540, 289, '49 matching blocks underneath', 21)
c += rect(36, 331, 888, 57, '#1d2b32', 9)
c += line('57,359 91,359', '#92ebbf', 3, 'stroke-dasharray="2 8"')
c += text(108, 366, 'The boarding outline stays above the floor.', 21, '#bcf4d9')
finish('covered-platform.svg', 414, 'A decorative floor can cover the platform', 'Side section: gold foundation below a polished andesite floor and carpet. The centre Lodestone remains exposed. A dotted green line shows the boarding outline above the floor.', c, ['gold','stone','wool','lodestone-side'])

# Charging: the compass texture intentionally stays the same on both sides.
c = text(36, 46, 'AT THE ANVIL', 16, '#d9b66b', 700, extra='letter-spacing="2"')
c += text(924, 46, '1 experience level', 20, '#d2c7e0', anchor='end')
for x in (156, 414, 718):
    c += rect(x, 80, 86, 86, '#30263f', 4, 'stroke="#756384" stroke-width="2"')
c += sprite('compass', 167, 91, 64)
c += sprite('star', 425, 91, 64)
c += sprite('compass', 729, 91, 64)
c += rect(718, 80, 86, 86, 'none', 4, 'stroke="#c494ef" stroke-width="3"')
c += text(328, 138, '+', 42, '#d2c7e0', anchor='middle')
c += line('555,123 651,123', '#e7c87f', 3)
c += line('636,111 651,123 636,135', '#e7c87f', 3)
c += text(199, 204, 'Linked compass', 22, anchor='middle')
c += text(457, 204, '1 Nether Star', 22, anchor='middle')
c += text(761, 204, 'Wither Compass', 22, '#dab0ff', 600, 'middle')
c += text(480, 256, 'One charge pays for the whole departure.', 20, '#bcb0d0', anchor='middle')
finish('charging.svg', 286, 'Charge a linked compass at an anvil', 'A linked compass plus one Nether Star produces a Wither Compass for one experience level. The ordinary compass texture is retained. One charge pays for the whole departure.', c, ['compass','star'])


def avatar(name, x, y, color, angle=0):
    return (f'<g><circle cx="{x}" cy="{y}" r="19" fill="#171128" stroke="{color}" stroke-width="3"/>'
            f'<svg x="{x-12}" y="{y-12}" width="24" height="24" viewBox="8 8 8 8"><use href="#tex-{name}"/></svg>'
            f'<path d="M{x-5} {y-24} L{x} {y-32} L{x+5} {y-24}Z" fill="{color}" transform="rotate({angle} {x} {y})"/></g>')


c = text(36, 46, 'KEEP YOUR PLACE', 16, '#d9b66b', 700, extra='letter-spacing="2"')
c += text(36, 85, 'Same offset. Same direction.', 30, weight=650)
for left, label in ((82,'Departure'),(626,'Arrival')):
    c += text(left+126, 129, label, 23, weight=600, anchor='middle')
    for x in range(7):
        for z in range(7):
            c += sprite('lodestone' if (x,z)==(3,3) else 'emerald', left+x*36, 157+z*36, 36)
            c += rect(left+x*36, 157+z*36, 36, 36, 'none', extra='stroke="#15483c" stroke-width="1"')
    c += avatar('steve', left+1.35*36, 157+1.7*36, '#fac778')
    c += avatar('alex', left+5.4*36, 157+2.5*36, '#86d7ff', 90)
    c += avatar('villager', left+2.25*36, 157+5.5*36, '#d5a1ff', 180)
c += line('397,271 564,271', '#d9b66b', 3)
c += line('549,258 564,271 549,284', '#d9b66b', 3)
c += text(480, 318, 'One journey', 20, '#cbbfe0', anchor='middle')
c += line('36,440 924,440', '#49375e', 1)
c += text(480, 477, 'An emerald group with two players and one villager.', 21, '#d2c7e0', anchor='middle')
c += text(480, 510, 'Each matching arrival position must be clear.', 20, '#bcb0d0', anchor='middle')
finish('relative-arrival.svg', 544, 'Travellers keep the same position around the Lodestone', 'Two top views of emerald platforms. Steve, Alex and a villager are shown at identical fractional offsets and facing directions before and after the journey.', c, ['emerald','lodestone','steve','alex','villager'])

# Portrait layouts keep labels legible on narrow screens.
c = text(24, 40, 'THE PLATFORM', 16, '#d9b66b', 700)
c += text(24, 80, '49 blocks + 1 Lodestone', 30, weight=650)
scene=''
for x,z in sorted(((x,z) for x in range(7) for z in range(7)), key=lambda p:(sum(p),p[0])):
    scene += cube(460+(x-z)*34,142+(x+z)*18,'gold')
scene += cube(460,216,'lodestone','lodestone-side')
c += f'<g transform="translate(-88 45) scale(.8)">{scene}</g>'
c += text(280, 420, '7 × 7 blocks', 27, '#e9c77d', 600, 'middle')
c += line('24,453 536,453','#49375e',1)
c += text(24,493,'SIDE VIEW',17,'#bcb0d0',650)
for i in range(7): c += sprite('gold',56+i*64,586,64)
c += sprite('lodestone-side',248,522,64)
c += text(280,703,'Lodestone above the centre.',25,anchor='middle')
c += text(280,746,'A gold block stays underneath.',23,'#bcb0d0',anchor='middle')
finish('platform-mobile.svg',784,'A single-layer teleportation platform','Portrait layout of the isometric platform and its side view. All 49 foundation blocks remain in place.',c,['gold','lodestone','lodestone-side'])

c=text(24,40,'A COVERED PLATFORM',16,'#d9b66b',700)
c+=text(24,80,'Hide the foundation.',30,weight=650)
for i in range(7):
    c+=sprite('gold',56+i*64,234,64)
    c+=sprite('lodestone-side' if i==3 else 'stone',56+i*64,170,64)
    if i!=3:c+=sprite('wool',56+i*64,166,64,4)
c+=line('48,149 512,149','#92ebbf',3,'stroke-dasharray="2 11"')
for y,name,label in [(344,'lodestone-side','Keep the Lodestone accessible.'),(395,'stone','Decorative floor and carpet.'),(446,'gold','49 matching blocks below.')]:
    c+=sprite(name,28,y-25,30)
    c+=text(76,y,label,23)
c+=text(280,505,'The outline stays above the floor.',23,'#bcf4d9',anchor='middle')
finish('covered-platform-mobile.svg',540,'A decorative floor can cover the foundation','A side view of the covered foundation, with a legend identifying the Lodestone, decorative floor and gold base.',c,['gold','stone','wool','lodestone-side'])

c=text(24,40,'AT THE ANVIL',16,'#d9b66b',700)
c+=text(536,40,'1 level',23,'#d2c7e0',anchor='end')
for x,name in [(62,'compass'),(238,'star'),(414,'compass')]:
    c+=rect(x-6,80,76,76,'#30263f',4,'stroke="#756384" stroke-width="2"')
    c+=sprite(name,x,86,64)
c+=rect(408,80,76,76,'none',4,'stroke="#c494ef" stroke-width="3"')
c+=text(184,128,'+',34,'#d2c7e0',anchor='middle')
c+=line('335,118 383,118','#e7c87f',3)+line('373,110 383,118 373,126','#e7c87f',3)
for x,line1,line2 in [(94,'Linked','compass'),(270,'1 Nether','Star'),(446,'Wither','Compass')]:
    c+=text(x,201,line1,23,anchor='middle')+text(x,231,line2,23,anchor='middle')
c+=text(280,282,'One charge for the whole group.',22,'#bcb0d0',anchor='middle')
finish('charging-mobile.svg',316,'Charge a linked compass at an anvil','Linked compass plus one Nether Star produces a Wither Compass for one level.',c,['compass','star'])

c=text(24,40,'KEEP YOUR PLACE',16,'#d9b66b',700)
c+=text(24,80,'Same offset. Same direction.',28,weight=650)
for top,label in [(147,'Departure'),(638,'Arrival')]:
    c+=text(280,top-22,label,27,weight=600,anchor='middle')
    for x in range(7):
        for z in range(7):
            c+=sprite('lodestone' if (x,z)==(3,3) else 'emerald',112+x*48,top+z*48,48)
            c+=rect(112+x*48,top+z*48,48,48,'none',extra='stroke="#15483c" stroke-width="1"')
    c+=avatar('steve',112+1.35*48,top+1.7*48,'#fac778')
    c+=avatar('alex',112+5.4*48,top+2.5*48,'#86d7ff',90)
    c+=avatar('villager',112+2.25*48,top+5.5*48,'#d5a1ff',180)
c+=line('280,510 280,563','#d9b66b',3)+line('267,550 280,563 293,550','#d9b66b',3)
c+=text(280,1022,'Keep each arrival position clear.',24,'#d2c7e0',anchor='middle')
finish('relative-arrival-mobile.svg',1054,'Travellers keep their relative positions','Two stacked emerald platforms show the same players and villager in the same positions and facing directions.',c,['emerald','lodestone','steve','alex','villager'])
