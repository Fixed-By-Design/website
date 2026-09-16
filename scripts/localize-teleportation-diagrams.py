#!/usr/bin/env python3
"""Generate the French SVG variants from the checked-in English originals.

Run after generate-teleportation-diagrams.py. Minecraft textures and geometry
stay unchanged; only labels, accessible descriptions and label sizing change.
"""
import json
from pathlib import Path
import xml.etree.ElementTree as ET

root = Path(__file__).resolve().parents[1]
translations = json.loads((root / 'scripts/teleportation-fr.json').read_text())
source = root / 'public/media/teleportation'
destination = source / 'fr'
destination.mkdir(exist_ok=True)
ET.register_namespace('', 'http://www.w3.org/2000/svg')
for path in source.glob('*.svg'):
    tree = ET.parse(path)
    tree.getroot().set('lang', 'fr')
    for node in tree.iter():
        if node.tag.rsplit('}', 1)[-1] not in ('text', 'title', 'desc'):
            continue
        original = node.text or ''
        if original == '+':
            continue
        if original not in translations:
            raise ValueError(f'Missing French label in {path.name}: {original}')
        node.text = translations[original]
        if node.tag.endswith('}text'):
            # Keep long labels within the space reserved by the original layout.
            ratio = min(1, len(original) / max(1, len(node.text)))
            size = float(node.get('font-size', '22'))
            node.set('font-size', str(round(max(16, size * ratio), 1)))
    tree.write(destination / path.name, encoding='unicode')
