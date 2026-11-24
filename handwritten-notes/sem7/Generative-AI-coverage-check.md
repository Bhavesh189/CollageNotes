# Generative AI (Sem 7) — Coverage Check

Sources: `notes-source/notes/sem7/generative-ai/gai-unit-2.pdf` (39 pp),
`gai-unit-3.pdf` (39 pp), `gai-unit-4.pdf` (9 pp) — 87 source pages total;
PYQ paper `public/pyq/sem7/GAI-2025.pdf` (3 pp, scanned, read visually and
with RapidOCR). No `gai-unit-1.pdf` or `gai-unit-5.pdf` exists anywhere in
the repo, and no Sem 7 syllabus exists — Units 1 and 5 are built from the
topics examined in the GAI-2025 paper and are marked **[PYQ-built]** in the
notes PDF (unit titles, intros, and the cover page).

Notes: `Generative-AI-Sem7-Handwritten-Notes-Full.pdf` — **105 pages**
(cover 1 p; Unit 1 pp 2–9; Unit 2 pp 10–27; Unit 3 pp 28–35; Unit 4 pp 36–43;
Unit 5 pp 44–52; 70 Most Important Questions pp 53–105).
Solutions: `pyq-solutions/sem7/GAI-2025-solution.pdf` — **16 pages, 22/22
questions solved, 0 unsolved, 0 unclear/illegible** (the paper is fully
legible; Part A Q.4 is reproduced exactly as printed, ungrammatical wording
included).

## A. Source-based topics (Units 2–4) — 33 topics, 33/33 covered

### Unit 2 — from gai-unit-2.pdf, Lectures 1–9
| # | Source topic (lecture) | Notes topic | ✓ |
|---|---|---|---|
| 1 | L1 CNN architecture; image as grid of pixels; receptive field | CNN Architecture | ✓ |
| 2 | L2 Convolution layer; kernel; activation map; output-size formula | The Convolution Layer | ✓ |
| 3 | Motivation: sparse interaction, parameter sharing, equivariance | Motivation Behind Convolution | ✓ |
| 4 | Pooling layer; max pooling; pooling output-size formula | The Pooling Layer | ✓ |
| 5 | Fully connected layer; non-linearity: sigmoid, tanh, ReLU | Fully Connected Layer and Non-Linearity | ✓ |
| 6 | L3 CNN building blocks: CONV, RELU, POOL, FC, BN, DO; stacking notation | CNN Building Blocks | ✓ |
| 7 | L4 Fully connected layers; Batch Normalisation (Ioffe & Szegedy 2015) | Batch Normalisation | ✓ |
| 8 | L4 Dropout (p = 0.5) | Dropout | ✓ |
| 9 | Designing a CNN: Fashion-MNIST (60,000 train / 10,000 test, 28×28, 10 classes; 5×5 kernels, Adam lr 0.001, cross-entropy, 90% test accuracy) | Designing a CNN — Fashion-MNIST Worked Example | ✓ |
| 10 | Applications: object detection (R-CNN family), semantic segmentation, image captioning | Applications of CNNs | ✓ |
| 11 | L5 RNN: hidden state, shared weights, h_t / y_t formulas | Recurrent Neural Network (RNN) | ✓ |
| 12 | How RNN works; Backpropagation Through Time (loss chain h3→h2→h1→h0) | How an RNN Works and BPTT | ✓ |
| 13 | L6 Training through RNN (7 steps); advantages, disadvantages, applications | Training an RNN — Steps, Advantages and Disadvantages | ✓ |
| 14 | Types of RNN: one-to-one, one-to-many, many-to-one, many-to-many | Types of RNN | ✓ |
| 15 | L7 Encoder; encoder-decoder; Sutskever model; Cho model (GRU + attention); Google NMT | Encoder-Decoder Architecture | ✓ |
| 16 | L8 Seq2Seq models; use cases; encoder/decoder; START/END tokens; inference; drawbacks (fixed context vector, vanishing gradient) | Sequence to Sequence (Seq2Seq) Models | ✓ |
| 17 | L9 Deep RNNs; nonlinear system identification; state-space models | Deep Recurrent Neural Networks | ✓ |
| 18 | Variations of RNN: Bidirectional RNN, LSTM (3 gates, read-write-forget); RNN vs DNN table | Variations of RNN — Bidirectional RNN and LSTM | ✓ |

### Unit 3 — from gai-unit-3.pdf ("Generative Models for Computer Vision")
**Important finding:** gai-unit-3.pdf is ~90% a repeat of gai-unit-2.pdf.
Lectures 1–4 repeat the Unit 2 CNN lectures and Lectures 5–10 repeat the
Unit 2 RNN lectures (page-by-page text similarity 0.85–1.00; only the
references page and the Lecture 10 heading differ). Those foundations are
therefore covered once, in full, in Unit 2 and are **not duplicated** in
Unit 3 — the notes say so in a box at the start of Unit 3. Unit 3 instead
covers the unit's own title subject (generative models for vision), grounded
in the paper topics and in the GAN/VAE/diffusion material named in the
Unit 4 source notes:

| # | Topic | Notes topic | ✓ |
|---|---|---|---|
| 19 | CNN as the feature extractor / encoder / discriminator / generator backbone for vision | CNNs for Computer Vision | ✓ |
| 20 | GAN: generator vs discriminator, minimax, mode collapse, image generation | Generative Adversarial Networks (GANs) | ✓ |
| 21 | VAE: encoder, latent distribution, reparameterisation, ELBO/KL, image compression | Variational Autoencoders (VAEs) | ✓ |
| 22 | VAE vs GAN comparison | VAE vs GAN | ✓ |
| 23 | Diffusion models: forward noise / reverse denoise, Stable Diffusion (named in Unit 4 source, Lecture 3) | Diffusion Models for Image Generation | ✓ |
| 24 | Image-to-image translation: paired (pix2pix) vs unpaired (CycleGAN) | Image-to-Image Translation | ✓ |
| 25 | Image generation applications: generation, super-resolution, inpainting, data augmentation, medical imaging | Applications of Generative Models for Images | ✓ |
| 26 | CNN vs GAN for image processing (GAI-2025 Part B Q.1) | CNNs vs GANs for Image Processing | ✓ |

### Unit 4 — from gai-unit-4.pdf, Lectures 1–4
| # | Source topic (lecture) | Notes topic | ✓ |
|---|---|---|---|
| 27 | L1 Generative models for multimodal data: encoders, fusion, decoders, paired data, challenges | Generative Models for Multimodal Data | ✓ |
| 28 | L1 Notable models: CLIP, DALL-E, Stable Diffusion, AudioPaLM | Notable Multimodal Models | ✓ |
| 29 | L2 Generative models for sequential data: autoregressive (RNN/LSTM/TCN), GANs (TimeGAN, DoppelGANger), Transformers; applications | Generative Models for Sequential Data | ✓ |
| 30 | L2 TimeGAN (embedding + adversarial + supervised loss); TimesFM foundation models | TimeGAN | ✓ |
| 31 | L3 Advanced style transfer: NST (Gram matrix, AdaIN), GAN-based, VAE-based, diffusion-based, multimodal/text-guided; applications; challenges | Advanced Style Transfer | ✓ |
| 32 | L4 CycleGAN: two generators, two discriminators, cycle consistency loss x ≈ F(G(x)), PatchGAN, attention, AdaLIN, SDCGAN; applications | CycleGAN | ✓ |
| 33 | CycleGAN vs traditional GAN (GAI-2025 Part A Q.9) | CycleGAN vs Traditional GAN | ✓ |

Excluded (not content): the repeated "References" lists (Foster, Goodfellow
et al.) at the end of each source unit — no content lost.

## B. PYQ-built topics (Units 1 and 5) — 17 topics, 17/17 covered

### Unit 1 — Introduction to Generative AI [PYQ-built]
| # | Paper topic (source question) | Notes topic | ✓ |
|---|---|---|---|
| 34 | Define generative AI; two types of generative models (Part A Q.1) | What is Generative AI | ✓ |
| 35 | How a generative model learns the data distribution; latent space; sampling | How Generative Models Learn | ✓ |
| 36 | Types of generative models: GAN, VAE, autoregressive, flow-based, diffusion, Transformer (Part A Q.1) | Types of Generative Models | ✓ |
| 37 | Generative vs discriminative models | Generative vs Discriminative Models | ✓ |
| 38 | History / evolution (2013 VAE, 2014 GAN, 2017 Transformer, 2020 diffusion & large models) | History of Generative AI | ✓ |
| 39 | Applications of generative AI (text, image, audio, science, business) | Applications of Generative AI | ✓ |
| 40 | Building a generative AI system: data → train → sample → evaluate → deploy | How a Generative AI System is Built | ✓ |
| 41 | Challenges, limitations, ethics: hallucination, bias, privacy, deepfakes, cost | Challenges, Limitations and Ethics | ✓ |

### Unit 5 — Generative AI for Language and Applications [PYQ-built]
| # | Paper topic (source question) | Notes topic | ✓ |
|---|---|---|---|
| 42 | Significance of Transformers; why they replaced RNNs (Part C Q.3) | Transformers — Introduction and Significance | ✓ |
| 43 | Self-attention: Query/Key/Value, scaled dot-product, multi-head | Self-Attention and Multi-Head Attention | ✓ |
| 44 | Transformer architecture: encoder/decoder blocks, positional encoding, masking | Transformer Architecture | ✓ |
| 45 | Language modelling with Transformers: autoregressive (GPT) vs masked (BERT); temperature, top-k, top-p (Part C Q.3) | Language Modelling with Transformers | ✓ |
| 46 | Text summarisation using generative models: extractive vs abstractive, ROUGE (Part B Q.2) | Text Summarisation using Generative Models | ✓ |
| 47 | Transformers in modern NLP applications like chatbots (Part B Q.4); chatbot design (Part C Q.4) | Transformers in Modern NLP — Chatbots | ✓ |
| 48 | RNNs and VAEs in generative text processing; their differences (Part C Q.5) | RNNs and VAEs in Generative Text Processing | ✓ |
| 49 | Applications of Transformers in NLP (Part A Q.7) | Applications of Transformers in NLP | ✓ |
| 50 | Challenges in generative NLP: hallucination, bias, cost, long context, safety | Challenges in Generative NLP | ✓ |

**Coverage result: 50/50 topics covered** (33 source-based + 17 PYQ-built).
No source topic left out; no topic added beyond the source notes + the
GAI-2025 paper topics (the only allowed additions are the 70-questions
section and the PYQ solution).

## C. 70 Most Important Questions — 70/70, 14 per unit, 45 starred
2-mark: short answers (4–6 lines). 5-mark: definition + paragraphs + bullets
+ example. 10-mark: full topic. Starred = in the GAI-2025 paper or a core
repeated topic. All 22 GAI-2025 questions appear in the 70Q or are answered
by its topics.

## D. GAI-2025 solutions — 22/22 solved, 0 unsolved, 0 flagged
Part A 10×2 (Q.1–Q.10), Part B 7×4 (all solved, although the paper asks for
5 of 7), Part C 5×10 (all solved, although the paper asks for 3 of 5).
Numerical checks verified: conv 32×32×3, 5×5, s=1, p=2 → 32×32×16;
pool 28×28×16, 2×2, s=2 → 14×14×16; Fashion-MNIST sizes 28→28→14→14→7;
value counts 12,544 → 3,136; MNIST VAE compression 784/20 ≈ 39×;
CIFAR-10 receptive-field weights 3×3×3 = 27 and 3×3×94 = 846.

## E. Quality checks
- Garble scan (long spaceless tokens, camel-joins, Devanagari, missing
  glyphs) on both final PDFs: **0 suspicious hits**.
- Visually inspected rendered pages from every unit and the solution PDF
  (notes pp 2, 10, 13, 23, 25, 28, 30, 36, 41, 44, 46, 47, 53, 60, 105;
  solutions pp 1, 9, 12, 16). Two diagram defects found and fixed before
  delivery: (1) two-line labels overflowing their boxes in the multimodal
  and LSTM/seq2seq diagrams; (2) Transformer diagram side-labels clipped
  at the page edge. Rebuilt and re-inspected — all clean.
- Style: Patrick Hand, blue body ink, black underlined headings, red key
  terms / definition boxes, unlined white A4, ~1.5 cm balanced margins,
  unit name top, page number bottom.
