# Deep Learning — Semester 7 — Coverage Check

Source: Bhavesh189/CollageNotes, `notes-source/notes/sem7/deep-learning/`
- dl-unit-1.pdf (25 pp), dl-unit-2.pdf (41 pp), dl-unit-3.pdf (44 pp), dl-unit-4.pdf (20 pp), dl-unit-5.pdf (35 pp) = **165 source pages**
- PYQ papers: `public/pyq/sem7/DL-2025.pdf` (3 pp, scanned), `DL-2026.pdf` (4 pp, scanned)

Output: `~/workspace/handwritten_notes/sem7/Deep-Learning-Sem7-Handwritten-Notes-Full.pdf` — **201 pages, A4**
- Unit 1 pp 3–27, Unit 2 pp 28–60, Unit 3 pp 61–92, Unit 4 pp 93–107, Unit 5 pp 108–136, 70 Most Important Questions pp 137–201
- Style: Patrick Hand, blue body ink, black underlined headings, red key terms, unlined white A4, ~1.5 cm balanced margins, unit name top, page number bottom.

## Result: 271 / 271 source headings covered

Every heading extracted from the 5 source units was checked against the built notes
(`covered.json`, 280 entries incl. merged fragments and unit-end expansions).
All 271 headings are present — either as their own section, merged into the
neighbouring section (tiny fragment headings), or with the heading text repaired
from a joined-word extraction error. Each item below was verified in the built PDF
text. 89 curated expansions (347 blocks) were also rendered; every expansion's
content was verified present in the notes.

### Unit 1 — Introduction to Neural Networks (43 headings) — 43/43
[x] What is Artificial Neural Network? [x] Output (merged) [x] Architecture of an artificial neural network
[x] Advantages of Artificial Neural Network (ANN) [x] How do artificial neural networks work?
[x] What is Deep Learning? [x] Machine (merged) [x] Supervised
[x] Deep learning algorithms like Convolutional (merged) [x] Unsupervised Machine Learning
[x] Reinforcement Machine Learning [x] Characteristics of ANN
[x] It is neurally implemented mathematical model (merged) [x] Perceptron model in Machine Learning
[x] What is Binary classifier in Machine Learning? [x] Basic Components of Perceptron
[x] Simple Perceptron Layer [x] Sign function [x] Step function, and [x] Sigmoid function
[x] How does Perceptron work? [x] Characteristics of Perceptron [x] Limitations of Perceptron Model
[x] What is Back propagation? [x] Features of Backpropagation [x] Working of Backpropagation
[x] Error = Actual Output – Desired Output (formula, folded into backpropagation section)
[x] Parameters [x] Training Algorithm [x] Updation of weight and bias [x] Types of Backpropagation
[x] Types of Learning Rules in ANN [x] Δw = αxiy [x] Δw = αxitj [x] Δw is the change in weight
[x] Δw_ij = η * (x_i - w_j) * f(w_j) (formula, folded into learning-rules section)
[x] Δw_ij is the change in weight [x] Activation Functions [x] Loss Functions
[x] Function Approximation [x] The Need for Function Approximation
[x] Types of Function Approximation in RL [x] Applications of Function Approximation in RL

### Unit 2 — Convolutional Neural Networks & Optimisation (55 headings) — 55/55
[x] Introduction to Convolution Neural Networks [x] Network (merged) [x] Simple CNN architecture
[x] How Convolutional Layers works? [x] Dimension of the image [x] Learnable Filters
[x] Layers used to build ConvNets [x] Types of layers [x] Max Pooling Process
[x] Fully connected layer [x] CNN Layers [x] Convolution operations [x] Convolution Kernels
[x] Kernal Map [x] Movement of the kernel [x] Sliding window protocol
[x] Variants of the Basic Convolution Function [x] Forward Propagation [x] Backward Propagation
[x] Forward propagation [x] Backward propagation [x] Iteration of backward propagation
[x] Training a deep neural network [x] Deep Nets and Shallow Nets [x] Hyper-parameter Tuning
[x] What are hyper-parameters? [x] Methods for tuning hyperparameters [x] Hidden Layer
[x] How hidden layer works? [x] Pros & cons of hidden layers [x] Generalization Gap
[x] Is it learning at all? [x] What is generalization? [x] Underfitting in Machine Learning
[x] Reasons for Underfitting [x] Techniques to Reduce Underfitting
[x] Overfitting in Machine Learning [x] Techniques to Reduce Overfitting
[x] Optimization in Deep learning [x] Gradient Descent Deep Learning Optimizer-
[x] Stochastic Gradient Descent Deep Learning Optimizer-
[x] Mini-batch Stochastic Gradient Descent- [x] Adagrad(Adaptive Gradient Descent) Optimizer -
[x] RMSprop (Root Mean Square) Optimizer- [x] Adam Deep Learning Optimizer-
[x] AdaDelta Deep Learning Optimizer - [x] Normalization in Machine Learning
[x] Xn = Value of Normalization (formula, folded into normalisation section)
[x] Xmaximum = Maximum value of a feature (folded) [x] Xminimum = Minimum value of a feature (folded)
[x] Xn = Xminimum - Xminimum / (Xmaximum - Xminimum) (folded)
[x] Xn = Xmaximum - Xminimum / (Xmaximum - Xminimum) (folded)
[x] Normalization techniques in Machine Learning [x] Standardization [x] Standardization

### Unit 3 — Data Splitting, Bias-Variance & Regression (57 headings) — 57/57
[x] Trainvs. Validation vs. Testset — repaired to "Train vs. Validation vs. Test Set"
[x] TheTrainingSet — repaired to "The Training Set" [x] TheValidationSet — repaired to "The Validation Set"
[x] TheTestSet — repaired to "The Test Set"
[x] How to split your MachineLearning data? — repaired to "How to split your Machine Learning data?"
[x] Advancedtechniquesfordatasplitting — repaired to "Advanced techniques for data splitting"
[x] Random (merged) [x] Stratified [x] Cross-Validation [x] Bias and Variance in Machine Learning
[x] Errors in Machine Learning [x] What is Bias? [x] What is a Variance Error?
[x] Different Combinations of Bias-Variance [x] Overfitting and Regularization
[x] Overfitting in Machine Learning [x] Reason for Overfitting [x] Techniques to avoid overfitting
[x] Regularization Technique [x] How Regularization used to prevent overfitting?
[x] Linear models and optimization [x] Types of Linear Regression [x] Linear Regression Line
[x] Cost function- [x] Yi = Actual value (merged) [x] Assumptions of Linear Regression
[x] What is Vanishing Gradient? [x] Why the Problem Occurs? [x] How can we identify?
[x] How can we solve the issue? [x] What is Exploding Gradient? [x] Why Exploding Gradient Occurs?
[x] How can we identify the problem? [x] How can we solve the issue? [x] Logistic Regression
[x] Cost Function [x] Minimizing the Cost with Gradient Descent
[x] What’s the difference between CNN and RNN? [x] What is a recurrent neural network?
[x] RNNs for autocorrect [x] What is a convolutional neural network? [x] Convolutional layers
[x] What are filters in convolutional neural networks? [x] How do filters work?
[x] Backpropagation In Convolutional Neural Networks [x] ReLu [x] Given an input image (x2, merged)
[x] Convolution Neural Networks - CNNs [x] Forward Propagation [x] Error (merged)
[x] Backpropagation [x] We are looking to compute (merged)
[x] During the reconstruction process, the deltas (merged)
[x] At this point we are looking to compute (merged) [x] Pooling Layer
[x] Average pooling - the error is multiplied by (merged)

### Unit 4 — Optimisation, Learning Rate & Batch Normalisation (51 headings) — 51/51
[x] Mini-batch gradient descent [x] Since the entire training data (merged)
[x] Since only a single training (merged) [x] Since a subset of training (merged)
[x] It makes smooth updates in (merged) [x] It makes very noisy updates (merged)
[x] Depending upon the batch (merged) [x] Mini-Batch Gradient Descent: Algorithm-
[x] Make predictions on the mini-batch (merged)
[x] Compute gradient(theta) = partial derivative of J(theta) w.r.t. theta (formula, folded into the algorithm section)
[x] Exponentially weighted Averages [x] Vt: Moving average value at day ‘t’ (merged)
[x] What does and means (merged) [x] Implementing Exponentially Weighted Average
[x] Get next θt (merged) [x] Bias Correction in Exponentially Weighted Moving Average
[x] RMS Prop [x] Learning rate: α (merged) [x] Exponential decay rate for averaging: γ (merged)
[x] Small constant for numerical stability: ε (merged) [x] Initial parameter values: θ (merged)
[x] Accumulated squared gradient for each parameter: Et (merged)
[x] Learning Rate Decay [x] Learning Rate Decay [x] How Learning Rate Decay works?
[x] Mathematical representation of Learning rate decay
[x] Assume that the starting learning rate is (merged) [x] Basic decay schedules
[x] Steps needed to implement Learning Rate Decay [x] The Problem of Local Optima [x] Batch Norm
[x] How does batch normalization work? [x] Advantages of batch normalization
[x] Batch normalization overfitting [x] Batch normalization equations
[x] Scaled and shifted activations: zi = γyi + β (merged) [x] What are hyperparameters?
[x] Some examples of Hyperparameters in Machine Learning [x] The k in kNN or K-Nearest Neighbour algorithm
[x] Learning rate for training a neural network [x] Train-test split ratio [x] Batch Size
[x] Number of Epochs [x] Branches in Decision Tree
[x] Difference between Parameter and Hyperparameter [x] Model Parameters
[x] Model Hyperparameters [x] Categories of Hyperparameters [x] Hyperparameter for Optimization (x2)
[x] Hyperparameter for Specific Models

### Unit 5 — RNN, LSTM, GANs & Frameworks (65 headings) — 65/65
[x] Recurrent Neural Networks [x] Hidden (merged — see known artifacts)
[x] The Architecture of a Traditional RNN [x] How does Recurrent Neural Networks work?
[x] Common Activation Functions [x] Recurrent Neural Network Vs Feed forward Neural Network
[x] Backpropagation Through Time (BPTT) [x] Two issues of Standard RNNs [x] RNN Applications
[x] Speech recognition [x] Generation of music [x] Automated Translations
[x] Analysis of video action [x] Generative Adversarial Networks (GANs) in Machine Learning
[x] Why need GANs? [x] Applications of GANs [x] Fashion, art, and advertising [x] Science
[x] Video games [x] Audio synthesis [x] Transfer learning [x] Generative (merged)
[x] How do GANs work? [x] Different types of Generative Adversarial Networks (GAN)s
[x] Spectral CNN [x] Spectral Graph [x] Self-Organizing Maps [x] How do SOM works? [x] Algorithm
[x] Restricted Boltzmann Machines [x] What are Boltzmann Machines?
[x] What is Restricted Boltzmann Machines (RBM)? [x] Applications of Restricted Boltzmann Machine
[x] Collaborative (merged) [x] RBMs (merged) [x] How do Restricted Boltzmann Machines work?
[x] Error = Reconstructed Input Layer-Actual Input layer (merged)
[x] Restricted Boltzmann Machines [x] Long Term Memory Networks [x] LSTM Architecture
[x] The Logic Behind LSTM [x] Example of LTSM Working [x] Forget Gate
[x] Let’s try to understand the equation, here (merged) [x] Uf: weight associated with the input (merged)
[x] Input Gate [x] Xt: Input at the current timestamp t (merged)
[x] Ui: weight matrix of input (merged) [x] Wi: Weight matrix of input associated with hidden state (merged)
[x] New Information [x] Output Gate [x] What are Bidirectional LSTMs? [x] LSTMs
[x] Deep Reinforcement Learning [x] Applications of Deep Reinforcement Learning
[x] Self-driving (merged) [x] Learning (merged) [x] Challenges of Deep Reinforcement Learning
[x] How those challenges can be addressed? [x] TensorFlow [x] Advantages of TensorFlow
[x] Disadvantages of TensorFlow [x] Keras [x] Advantages of Keras [x] Disadvantages of Keras

## 70 Most Important Questions — 70 questions, 52 starred
- 8 x 2-mark, 31 x 5-mark, 31 x 10-mark; 14 per unit; starred = topic asked in DL-2025 or DL-2026 PYQ papers.
- Answers sized by marks (2-mark 4–6 lines, 5-mark definition + paras + example, 10-mark full topic ~600 words).

## Diagrams in the notes (all drawn, fully labelled)
Neuron (inputs/weights/bias → Y), ANN 3-layer architecture, backpropagation flow,
Venn diagram AI > ML > DL, CNN pipeline (input → conv → ReLU → pool → flatten/FC → output),
RNN unrolled in time (Units 3 and 5), LSTM gates ladder, GAN generator vs discriminator,
plus 17 comparison tables (activation functions, optimisers, CNN vs RNN, bias-variance,
supervised vs unsupervised, ML vs DL, pooling, normalisation vs standardisation, etc.).

## PYQ solutions
- `~/workspace/handwritten_notes/pyq-solutions/sem7/DL-2025-solution.pdf` — **12 pages, 17 questions solved**
  (Part A 10 x 2 marks, Part B 7 x 4 marks). Part C NOT solved — see flags below.
- `~/workspace/handwritten_notes/pyq-solutions/sem7/DL-2026-solution.pdf` — **15 pages, 22 questions solved**
  (Part A 10 x 2 marks, Part B 7 x 4 marks, Part C 5 x 10 marks).
- All numerics recomputed and verified in Python: neuron output (net 0.78; sigmoid 0.6857,
  tanh 0.6527, ReLU 0.78); backpropagation worked example (error 0.0112 → 0.0090);
  perceptron OR gate; gradient descent steps (w 0 → 0.6 → 1.08 → 1.464 → 1.7712);
  CNN output size (32x32, 5x5, stride 1, padding 2 → 32x32) and parameters (456);
  batch norm on [2, 4, 6, 8] (mean 5, variance 5, normalised [-1.342, -0.447, 0.447, 1.342]);
  EWA with beta 0.9 (corrected 10.0, 11.05, 11.03); linear regression (slope 1.5, intercept 0.33);
  logistic regression (x = 4 → p = 0.7311); Bayes rule disease example (9.02%).

## Questions NOT solved / flagged
1. **DL-2025 Part C Q.1–Q.5 [10 marks each] — NOT solved.** Page 3 of the DL-2025 scan is a
   Disaster Management paper wrongly bound into the scan (natural hazards, soil conservation,
   disaster management stages, emergency response teams, land subsidence in India). The five
   questions are listed verbatim in the solution PDF under "Questions flagged as unclear in
   the scan" and are NOT solved as Deep Learning. The correct Deep Learning Part C for this
   paper is missing from the scan.
2. **DL-2025 Part A Q.4** — printed as "What are used hidden layers?"; wording is unclear in
   the scan; answered as "What are hidden layers used for?" and flagged in the solution PDF.
3. **PYQ-only topics** (in the source notes only briefly or not at all, solved only in the
   solution PDFs, NOT added to the notes): Bayes rule, scalar vs vector, rule-based system
   vs deep learning, Venn diagram, tensors, eigen decomposition, practical issues in NN
   training. GRU is covered in the notes under the LSTM section (source Unit 3 mentions
   GRUs; full GRU gates + LSTM-vs-GRU table added there).

## Quality checks done
- Garble scan (long spaceless tokens, camel-joins, Devanagari, missing glyphs, "????"):
  **0 suspicious hits** in all three PDFs (one hit found and fixed first:
  "Advancedtechniquesfordatasplitting" → "Advanced techniques for data splitting";
  also repaired "TheTrainingSet", "TheValidationSet", "TheTestSet", "Trainvs.",
  "MachineLearning data" via the sanitiser).
- Source formula fix: sigmoid "F(x) = (1/1 + exp(-????x))" corrected to
  "F(x) = 1 / (1 + exp(-lambda x))" (lambda = steepness parameter).
- Visual inspection of rendered pages: notes pp 1, 3, 5, 20, 28, 40, 62, 93, 108, 137, 150;
  DL-2025 solutions pp 1, 5, 6, 10, 11; DL-2026 solutions pp 1, 5, 8, 10, 14.
  All legible, style consistent. One defect found and fixed during inspection: the neuron
  diagram's bias ellipse overlapped the x1 ellipse and the diagram was rendered twice on
  p3 — fixed (redrawn diagram, de-duplicated), rebuilt, re-inspected clean.
- Diagram presence verified by text search: neuron p3, CNN p28, RNN unroll pp 85 + 108,
  Venn p8, GAN p114, LSTM ladder pp 126/128, backprop flow p16.

## Known minor artifacts (source-extraction, content intact)
- Unit 5, RNN section: the sentence reads "The most important component of RNN is the state"
  — the word "Hidden" was a standalone line in the source PDF and was consumed as a fragment
  heading during extraction. The hidden state is fully defined in the expansion below it.
- Unit 4, mini-batch section: a source sentence fragment ("is considered before taking a step
  in the direction of gradient, therefore it takes a lot of time for making a single update")
  reads as a continuation of the preceding merged fragment; the full explanation is in the
  expansion immediately below it.
- Unit 5, LSTM source paragraph begins "Memory networks, or LSTMs, are a special kind..." —
  the words "Long Short-Term" were a standalone heading line in the source; the full
  definition is in the expansion next to it.
- Nothing was removed: all source paragraphs are present in the notes; only the headings
  listed as "(merged)" or "(folded)" lost their standalone heading line.
