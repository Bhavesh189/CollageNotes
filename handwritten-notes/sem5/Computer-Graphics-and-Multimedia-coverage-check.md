# Coverage Check — Computer Graphics and Multimedia (Sem 5)

**Subject:** Computer Graphics and Multimedia (5CS4-04 / 5IT4-04), B.Tech V Sem
**Papers used:** CGM-2022 (Main/Back 2021-22, 120 marks), CGM-Dec-2020 (Main Dec 2020, 120 marks), CGM-May-2023 (Main/Back May 2023, 120 marks)
**Built from:** PYQ topics — no source notes or syllabus for this subject exist in the repo.
**Notes:** `Computer-Graphics-and-Multimedia-Sem5-Handwritten-Notes-Full.pdf` — 118 pages, A4
**Solutions:** `CGM-2022-solution.pdf` — 22 pages, 22/22 questions; `CGM-Dec-2020-solution.pdf` — 25 pages, 22/22 questions; `CGM-May-2023-solution.pdf` — 23 pages, 22/22 questions
**70 Questions:** 70, with red stars on the questions asked in the three papers.

## Topic coverage (59/59)

### Unit 1 — Graphics Foundations
- [x] Pixel and frame buffer (refresh buffer)
- [x] Raster scan vs random scan displays (with comparison table)
- [x] Refresh rate numerics: 640x480 at 60 fps -> 34.72 microseconds per row; 415 lines, 3:4, 12 bits/px, 30 fps -> 82.62 Mbps (both verified by code)
- [x] LCD
- [x] Properties of video display devices
- [x] Bitmap vs pixmap
- [x] Computer graphics standards (GKS, PHIGS, OpenGL, DirectX, JPEG/PNG/SVG)
- [x] History: first use of computer graphics (Whirlwind, early 1950s; Sketchpad 1963)
- [x] Refresh buffer / frame buffer

### Unit 2 — Curves, Transformations and Surfaces
- [x] Spline curves and ways of specifying them
- [x] Bezier curve and its important properties
- [x] B-spline curve; Bezier vs B-spline difference
- [x] Shearing
- [x] Rotation and scaling in 2D
- [x] 3D rotation step by step with transformation matrices
- [x] Composite transformation and its primary purpose
- [x] Reflection in the line y = mx + c (sequence of transformations)
- [x] Commutativity proof: rotation and scaling commute iff Sx = Sy or theta = n pi (proved by matrix multiplication)
- [x] 2D scaling with example
- [x] 3D transformations (translation, rotation, scaling, reflection, shearing, homogeneous coordinates)
- [x] Vanishing point
- [x] Polygon mesh and its representations
- [x] Quadratic surfaces and why they are used
- [x] Surface patch

### Unit 3 — Scan Conversion, Clipping and Filling
- [x] Midpoint line error always <= 1/2 (proof)
- [x] Bresenham's circle algorithm with decision variable derivation and diagram
- [x] 8-way symmetry in circle scan conversion
- [x] Ellipse drawing algorithm
- [x] Mid-point circle procedure, centre (5,5) radius 8: octant points (0,8),(1,8),(2,8),(3,7),(4,7),(5,6); 44 distinct pixels (verified by code)
- [x] Cohen-Sutherland line clipping with example and outcodes diagram
- [x] Liang-Barsky line clipping
- [x] Nicholl-Lee-Nicholl line clipping
- [x] Flood fill and its importance
- [x] Boundary fill; area filling from inside outwards; 8-connected approach for complex figures
- [x] Antialiasing
- [x] Space-filling curves and essential properties

### Unit 4 — Colour, Light, Shading and Shadows
- [x] Illumination models compared (ambient, diffuse, specular; Phong, Blinn-Phong, Cook-Torrance)
- [x] Properties of light and basic illumination models
- [x] Light sources (point, directional, spot, ambient)
- [x] Flat shading
- [x] Gouraud shading
- [x] Phong shading (with flat/Gouraud/Phong comparison table)
- [x] Ray tracing method
- [x] RGB and HSV models, compared and contrasted
- [x] CMY and YIQ models; CMY vs HSV difference
- [x] HSV-RGB conversion in both directions with worked example
- [x] Halftoning; 2x2 grid on a bi-level system -> 5 intensity levels (verified)
- [x] Two methods for computing shadow (shadow map, shadow volume)
- [x] Reflection mapping

### Unit 5 — Animation, Fractals and Projections
- [x] Morphing and tweening; difference between them; methods of morphing
- [x] Key frames
- [x] How computer animation is created
- [x] Computer animation techniques (key frame, procedural, motion capture, physics-based)
- [x] Fractals, fractal dimension, use of fractals in graphics
- [x] Julia sets
- [x] Koch curves (with construction diagram)
- [x] Self-similarity
- [x] Creating an image by iterated functions (Barnsley fern)
- [x] Parallel and perspective projections

## Paper-by-paper question coverage
- CGM-2022: Part A 10/10, Part B 7/7, Part C 5/5 — 22/22 solved.
- CGM-Dec-2020: Part A 10/10, Part B 7/7, Part C 5/5 — 22/22 solved.
- CGM-May-2023: Part A 10/10, Part B 7/7, Part C 5/5 — 22/22 solved.

## Flags / assumptions
- CGM-Dec-2020 Part B Q.6 is printed as "Write down the sequence of transformations for reflection of the image in the line y = mx + c (refer on image)". Reproduced exactly as printed in the solution PDF; answered as the reflection in the line y = mx + c.
- Raster row-time numerical assumes no retrace blanking time (stated in the solution).
- TV bits numerical rounds 553.33 pixels per row to 553 (stated in the solution).
- No question in any of the three papers was illegible; nothing was left unsolved.
- The 2D box rotation in CGM-Dec-2020 Part B Q.7 is read as the box with corners (10,15), (15,15), (15,25), (10,25) rotated 90 degrees anticlockwise about (10,15), giving (10,15), (10,20), (0,20), (0,15) (verified by code).

## Verification
- Garble scan: 0 hits.
- pdfinfo: notes 118 pages A4; CGM-2022 solution 22 pages A4; CGM-Dec-2020 solution 25 pages A4; CGM-May-2023 solution 23 pages A4.
- Visual check: title p1, Cohen-Sutherland outcodes diagram p30, Koch construction diagram p56, 70Q start p61, CGM-Dec-2020 solution p3 — all clean, no garble, diagrams render correctly (Koch diagram fixed twice: peak height and caption overlap).
