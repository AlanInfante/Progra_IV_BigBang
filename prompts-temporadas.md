# Prompts para generar las imágenes de las temporadas

36 imágenes: 3 por cada una de las 12 temporadas.

## Cómo usarlos

1. En Gemini, **subí primero tus imágenes de personajes** (`sheldon.webp`, `penny.webp`, etc.) como referencia. Nano Banana mantiene la apariencia de los personajes entre imágenes cuando les das una referencia visual, y sin eso cada foto te va a salir con caras distintas y la galería se ve incoherente.
2. Pegá el **prompt base** una sola vez al empezar la conversación.
3. Después pedí las escenas de a una, con la línea correspondiente.
4. Guardalas como `t01-1`, `t01-2`, `t01-3`, `t02-1`… hasta `t12-3`, dentro de `Imagenes/temporadas/`.

**Formato de salida:** proporción 4:3, exportadas a WebP de 800 × 600 px y menos de 100 KB. Si Gemini te las da más grandes, achicalas en Photopea antes de subirlas.

---

## Prompt base (pegar una vez)

> Generate photorealistic sitcom stills in the visual style of a 2010s American multi-camera comedy set in Pasadena, California. Warm practical lighting, shallow depth of field, natural skin tones, slightly saturated colors. Keep the characters consistent with the reference images I uploaded. Frame every shot in 4:3 aspect ratio, horizontal. No on-screen text, no logos, no watermarks, no subtitles. Do not imitate any real actor; treat the people in the reference images as the canonical look of these characters.

Y después, para cada escena:

> Now generate: [pegar acá la línea de la escena]

---

## Las 36 escenas

### Temporada 1 — 2007-2008
1. A young blonde woman carrying cardboard moving boxes in an apartment building hallway, two nerdy men in the doorway watching awkwardly.
2. Four male friends eating Thai takeout from containers on a couch in a cluttered living room full of comic books and science posters.
3. A large whiteboard covered in handwritten physics equations in a messy apartment living room, late evening.

### Temporada 2 — 2008-2009
1. Four friends playing video games on a couch at night, controllers in hand, lit by the TV screen.
2. A group of friends browsing shelves in a crowded comic book store, superhero figures in the background.
3. Four scientists trying on bulky red polar expedition gear in an apartment, packing crates labeled with scientific equipment.

### Temporada 3 — 2009-2010
1. A small scientific research camp on the Arctic ice: tents, snowmobiles and instruments under a pale sky.
2. A couple on a first date at a small restaurant, nervous smiles, candle on the table.
3. Two men hunched over a laptop filling in a dating profile, laughing, a third man frowning beside them.

### Temporada 4 — 2010-2011
1. Two young women having coffee together at a kitchen counter, one prim and reserved, the other relaxed and friendly.
2. A small engagement party in an apartment, friends raising glasses, a short blonde woman showing a ring.
3. A group of friends in homemade superhero costumes at a comic convention, crowded hall behind them.

### Temporada 5 — 2011-2012
1. A small wedding ceremony on a city rooftop at dusk, friends gathered in a semicircle.
2. People on a rooftop watching a distant rocket launch trail in the evening sky.
3. A formal dinner date between a tall lanky physicist in a suit and a woman in a cardigan, both stiff and earnest.

### Temporada 6 — 2012-2013
1. An astronaut floating inside the International Space Station module, surrounded by equipment and cables.
2. A group of friends in a living room on a video call with an astronaut shown on the TV screen.
3. An emotional airport arrival: friends greeting a returning astronaut with a handmade sign.

### Temporada 7 — 2013-2014
1. A man with a suitcase standing alone on a train station platform, looking uncertain.
2. A man proposing with a ring to a blonde woman in a parked car at night, both crying and laughing.
3. A whiteboard full of crossed-out equations in a dim office, a frustrated physicist sitting in front of it.

### Temporada 8 — 2014-2015
1. A blonde woman in business clothes with a sample case, standing in a pharmaceutical company lobby.
2. A modern pharmaceutical laboratory with researchers in lab coats and rows of samples.
3. A tense conversation between a couple sitting apart on a living room couch.

### Temporada 9 — 2015-2016
1. A small Las Vegas wedding chapel interior with neon lights and a couple at the altar.
2. A birthday celebration in an apartment, cake with candles, friends singing.
3. A group of friends in a movie theater wearing 3D glasses, popcorn in hand.

### Temporada 10 — 2016-2017
1. A freshly decorated baby nursery with a crib, mobile and soft lighting.
2. A couple moving in together, cardboard boxes everywhere, one labeling them meticulously.
3. Close-up of an engagement ring being offered in a hallway, two people emotional.

### Temporada 11 — 2017-2018
1. Wedding preparations: a bride trying on a dress with friends, a groom adjusting a bow tie.
2. A wedding ceremony with the full group of friends as guests, warm indoor lighting.
3. A wedding reception: toast with glasses raised, cake on the table, friends laughing.

### Temporada 12 — 2018-2019
1. A whiteboard covered in a new physics theory, two scientists standing proudly in front of it.
2. A formal Nobel Prize ceremony in Stockholm: stage, medals, audience in evening dress.
3. A final group portrait of seven friends sitting together on a brown couch in an apartment living room.

---

## Si Gemini se niega

Puede rechazar pedidos que mencionen personas reales o series con derechos. En ese caso:

- No nombres la serie ni a los actores en el prompt; describí a los personajes por su aspecto ("a tall lanky theoretical physicist in a superhero t-shirt").
- Los prompts de arriba ya están escritos así, a propósito.
