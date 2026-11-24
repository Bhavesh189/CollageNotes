# Digital Image Processing (Sem 6) — Coverage Check

**Subject:** Digital Image Processing, Semester 6
**Sources:** Bhavesh189/CollageNotes, `notes-source/notes/sem6/digital-image-processing/`
`dip-unit-1.pdf` (52 pp) · `dip-unit-2.pdf` (51 pp) · `dip-unit-3.pdf` (28 pp) ·
`dip-unit-4.pdf` (12 pp) · `dip-unit-5.pdf` (40 pp) — **183 source pages, ~25,777 words**
**Output:** `~/workspace/handwritten_notes/sem6/Digital-Image-Processing-Sem6-Handwritten-Notes-Full.pdf`
**Pages:** 141 (Unit 1 pp 1–22, Unit 2 pp 23–43, Unit 3 pp 44–55, Unit 4 pp 56–67,
Unit 5 pp 68–88, 70 Most Important Questions pp 89–141)
**Style:** Patrick Hand, blue body ink, black underlined headings, red key terms,
unlined white A4 portrait, ~1.5 cm balanced margins, unit name top, page number bottom.

## Result: 252 / 252 source sections accounted for

- **164 sections** rendered under their own (sometimes renamed) heading
- **74 sections** merged into the neighbouring section (tiny fragments < 25 words,
  figure labels, lecture-marker headings, 1-word format names)
- **14 sections dropped** — non-syllabus material only (see below); no syllabus topic dropped
- **53 / 53 curated expansions** present in the notes (verified by text search)
- **70 / 70 questions** in Part B (14 per unit; 10 × 2-mark, 31 × 5-mark, 29 × 10-mark;
  51 starred as repeated in PYQs)

## Unit 1 — Digital Image Fundamentals (source 52 pp)

| # | Source topic | Status |
|---|---|---|
| 1 | Introduction to Image Processing & Applications | ✓ rendered + expansion |
| 2 | Objectives / Outcomes / Syllabus | ✓ objectives kept as intro; OUTCOMES fragment dropped (not a topic) |
| 3 | Goals of DIP | ✓ |
| 4 | Applications of DIP (medical, remote sensing, industry, security, astronomy, OCR) | ✓ rendered + expansion |
| 5 | Image Processing Toolbox / Career and current fields | ✓ merged |
| 6 | Components: sensors, specialised hardware, computer, software, mass storage, display, networking | ✓ rendered + expansion + steps diagram |
| 7 | Digital image representation — f(x, y), M×N matrix, L = 2^k, storage size b = M×N×k | ✓ rendered (renamed "Digital Image Representation — f(x, y)") + expansion |
| 8 | Spatial resolution, intensity (gray-level) resolution, false contouring | ✓ rendered + expansions |
| 9 | Relationships between pixels: neighbours (4/8), adjacency, connectivity, regions, D4/D8/Euclidean distance | ✓ rendered + expansion |
| 10 | Fundamental parameters of an imaging system; sensor size, depth of field | ✓ |
| 11 | Illumination, reflectance and image formation | ✓ rendered (renamed) |
| 12 | Sampling and quantization, aliasing | ✓ rendered + expansion |
| 13 | Fundamental steps in DIP (11 steps) | ✓ rendered + expansion + steps diagram |
| 14 | Types of images / How machines "see" images; binary, grayscale, colour; image formats (JPEG, PNG, GIF, TIFF, BMP, PSD, PDF, EPS, AI, INDD) | ✓ rendered + expansion |
| 15 | Phases of image processing; example of an image restoration operation | ✓ |
| 16 | Representation and description; object detection and recognition; knowledge base | ✓ |
| 17 | Textbook reference list (Gonzalez, Jain, Pratt, Pakhira) | ✗ dropped — references, not content |

## Unit 2 — Image Transformation & Filtering (source 51 pp)

| # | Source topic | Status |
|---|---|---|
| 1 | Intensity transformations: g(x, y) = T(f(x, y)), negative, log, power-law | ✓ rendered (renamed "Point Processing") + expansion |
| 2 | Gamma transformations | ✓ rendered + expansion |
| 3 | Histograms: introduction, applications, sliding, stretching, histogram of an image | ✓ rendered + expansions + histogram diagram |
| 4 | Histogram equalization | ✓ rendered + expansion (worked example) |
| 5 | Spatial filtering and its types; classification; spatial filtering with a template | ✓ rendered + expansion |
| 6 | Smoothing filters: mean, Gaussian, adaptive smoothing; order-statistic filters | ✓ rendered + expansions |
| 7 | Sharpening filters; Laplacian | ✓ rendered + expansion |
| 8 | Frequency domain filters: low-pass, high-pass, band-pass; G(u, v) = H(u, v)·F(u, v) | ✓ rendered + expansion + spectrum diagram |
| 9 | Fourier series, Fourier transform, difference between series and transform, phase, magnitude | ✓ rendered + expansion |
| 10 | Masks; convolution (flip, multiply, add); correlation; why convolution | ✓ rendered + expansion (worked example) |
| 11 | Colour models: additive/subtractive, CMYK, RGB, RGB→CMY, true vs false colour, intensity slicing | ✓ rendered + expansion |
| 12 | Wavelet transformation; wavelet analysis; wavelet-based filtering; ECG application | ✓ rendered + expansion |

## Unit 3 — Image Restoration (source 28 pp)

| # | Source topic | Status |
|---|---|---|
| 1 | What is image restoration? Corruption (motion blur, noise, mis-focus) | ✓ rendered + expansion |
| 2 | Categories of restoration (commercial photo-service list) | ✗ dropped — marketing copy, not syllabus |
| 3 | Examples of restoration (noisy TV image filtering) | ✓ rendered (renamed "Examples of Image Restoration") |
| 4 | Image degradation model: g(x, y) = h(x, y) * f(x, y) + n(x, y) | ✓ rendered + expansion + block diagram |
| 5 | Noise: classification of noise (Gaussian, salt & pepper, uniform, Rayleigh, exponential, gamma, periodic) | ✓ rendered + expansions |
| 6 | Types of image noise filters; filtering Gaussian noise; filtering salt-and-pepper noise | ✓ rendered + expansion |
| 7 | Inverse filter | ✓ rendered + expansion |
| 8 | Wiener filter (covered in restoration lecture + expansion) | ✓ expansion |
| 9 | Homomorphic filtering; illumination–reflectance model F(x, y) = I(x, y) × R(x, y) | ✓ rendered + expansion |
| 10 | Commercial photo-restoration service sections (benefits, preserving originals, scratches/folds/tears, varieties, electronic storage, marketing benefits, photo masking, clipping path) | ✗ dropped — advertising copy from a photo-restoration company pasted into the source; no syllabus content |

## Unit 4 — Image Compression (source 12 pp, thinnest unit — expanded to full depth)

| # | Source topic | Status |
|---|---|---|
| 1 | What is image compression? Lossy vs lossless | ✓ rendered + expansions |
| 2 | Types of image compression; pros/cons of each | ✓ rendered + expansions |
| 3 | Redundancy in image processing (coding, interpixel, psychovisual); data compression | ✓ rendered + expansion |
| 4 | Huffman codes; Huffman coding worked example (105 characters, 6 symbols, 224 bits, ~25% saving) | ✓ rendered + expansion |
| 5 | Arithmetic coding; applications of arithmetic coding | ✓ rendered + expansion |
| 6 | JPEG compression: steps, RGB→YCbCr, downsampling, 8×8 DCT, quantization, entropy coding | ✓ rendered + expansion + steps diagram |
| 7 | DCT formula | ✓ rendered + expansion |

## Unit 5 — Image Segmentation & Representation (source 40 pp)

| # | Source topic | Status |
|---|---|---|
| 1 | Image segmentation: definition, applications, groups, classes of techniques | ✓ rendered + expansion |
| 2 | Thresholding | ✓ rendered + expansion |
| 3 | Point detection; line detection | ✓ rendered + expansion |
| 4 | Discontinuity-based segmentation; detection of discontinuities | ✓ rendered |
| 5 | Edge-based segmentation; edge detection; ideal spike edge | ✓ rendered + expansion |
| 6 | Basic formulation; edge linking and boundary detection | ✓ rendered |
| 7 | Hough transform: history, what/why/how it works, algorithm, (rho, theta) space, worked example, advantages, applications (biometrics, object recognition/tracking, underwater, industrial, medical, unconventional) | ✓ rendered + expansion + steps diagram |
| 8 | Region-based segmentation: pixel-based, region-based, top-down, bottom-up; region splitting and merging | ✓ rendered + expansion |
| 9 | Edge operators: Sobel vertical/horizontal, negative Laplacian | ✓ rendered (in edge detection expansion) |
| 10 | Representation schemes: chain codes, polygonal approximations, minimum perimeter polygons, signatures, convex hull | ✓ rendered + expansions |
| 11 | Boundary and regional descriptors; distance measures (Euclidean, D4, D8) | ✓ rendered + expansions |
| 12 | Morphological processing (erosion, dilation, opening, closing) | ✓ expansion (in the source: listed among the fundamental steps in Unit 1; mentioned in Unit 5) |

## Dropped / excluded (14 sections, all non-syllabus)

1. Unit 1 textbook reference list (Gonzalez / Jain / Pratt / Pakhira) — references, not content
2. Unit 1 learning-outcome fragments ("To be familiar with…", "Understand wavelets and image compression") — course outcomes, not topics
3. Unit 3 commercial photo-restoration service copy (10 sections: benefits, preserving originals, scratches/folds/tears, varieties, electronic storage, marketing benefits, techniques for restoring images, photo masking, clipping path, categories of restoration) — advertising text, no DIP theory

## PYQ solutions — 4 / 4 papers, 72 questions, all solved

| Paper | Questions | Solution PDF | Pages |
|---|---|---|---|
| DIP-2022 (80 marks) | 14 (A 5 + B 6 + C 3) | `pyq-solutions/sem6/DIP-2022-solution.pdf` | 11 |
| DIP-2024 (70 marks) | 22 (A 10 + B 7 + C 5) | `pyq-solutions/sem6/DIP-2024-solution.pdf` | 16 |
| DIP-2025 (70 marks) | 22 (A 10 + B 7 + C 5) | `pyq-solutions/sem6/DIP-2025-solution.pdf` | 15 |
| DIP-Aug-2023 (80 marks) | 14 (A 5 + B 6 + C 3) | `pyq-solutions/sem6/DIP-Aug-2023-solution.pdf` | 11 |

All numericals verified by independent recomputation (Python): derivatives,
compression ratio 4:1 / 75%, bit-plane slicing table, image arithmetic
(addition/multiplication/negative), RGB→HSV (210°, 0.5, 0.8) with inverse check,
Sobel Gx = 1, Gy = 3, magnitude 3.16, Huffman L = 2.20 bits, H = 2.12 bits,
efficiency 96.4%, DFT of 4×4 impulse / 2×2 matrix / [2, 4, 6, 8] with IDFT
verification, convolution [1, 10, 35, 68, 63, 30] and correlation
[5, 38, 67, 64, 27, 6], image statistics (mean 60.89, median 67, mode 10,
IQR 84.5, variance 1704.77, SD 41.29), 8″×8″ @ 100 dpi = 640,000 pixels,
CIE mixture (0.2325, 0.45), 4×4 entropy 1 bit/pixel with Huffman 8:1, 87.5% saving.

### Unclear / flagged questions (flagged at the end of the relevant solution PDF)

1. **DIP-2022 Part C Q.3** — the circled term in the question is read as **IQR**
   (interquartile range); worked with the standard quartile method (Q1 = 10.5, Q3 = 95,
   IQR = 84.5).
2. **DIP-Aug-2023 Part B Q.3** — the printed formula is wrong in two places: a minus
   sign in front and the second impulse at (u − u0/2π, v + v0/2π). The correct result
   F(u, v) = (A/2)[δ(u − u0/2π, v − v0/2π) + δ(u + u0/2π, v + v0/2π)] is derived and
   the misprint is flagged.
3. **DIP-Aug-2023 Part B Q.4** — word-for-word repeat of Part B Q.2 in the same paper
   (same two images, same three operations). Solved once under Q.2; the repeat is noted.
4. **DIP-Aug-2023 Part B Q.5** — the paper does not state the mixing proportions for
   the third colour C3, so C3 is worked out for an **equal mixture** (0.2325, 0.45) and
   the assumption is stated. Also C2 = (0.51, 0.6, 1) has x + y = 1.11 > 1, so it lies
   outside the spectral locus and cannot be a real colour (its Z comes out negative).
5. **DIP-Aug-2023 Part C Q.2** — the paper asks for any five of ten DFT properties;
   five are proved: (a), (d), (f), (g), (j).

## Quality checks done

- Garble scan on all 5 output PDFs: **0 long unspaced tokens**; no joined/split words.
- Visually inspected sample pages from every unit (pp 2, 25, 28, 45, 60, 75, 95, 120, 121)
  and every solution PDF (2022 pp 5, 8; 2024 p 8; 2025 p 7; Aug-2023 p 6) — all legible,
  diagrams render cleanly (histogram bars, steps ladders, spectrum, degradation blocks).
- Fixes applied after inspection: numeric-only lecture headings removed; textbook
  references and syllabus/outcome fragments removed from definition boxes; histogram
  diagram label overlap fixed; a false expansion match ("Introduction" pulling the
  Unit 1 intro into Unit 2) removed; two expansions that never matched a heading
  ("what is digital image processing", "noise modeling") attached explicitly per unit.
- No other subject's output was touched; nothing uploaded to GitHub; no token requested.
