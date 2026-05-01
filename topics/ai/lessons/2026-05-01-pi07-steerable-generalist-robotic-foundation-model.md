# pi0.7: A Steerable Generalist Robotic Foundation Model

Source note: Physical Intelligence, "pi0.7: a Steerable Generalist Robotic Foundation Model with Emergent Capabilities." Source PDF: [pi.website/download/pi07.pdf](https://www.pi.website/download/pi07.pdf). The paper stylizes the model name with the Greek letter pi; this lesson uses `pi0.7` for plain-text readability.

## The Paper In One Sentence

pi0.7 is a 5B-parameter vision-language-action robot model that tries to make robot behavior more general by training on highly diverse robot and non-robot data, but with much richer context in the prompt: subtask language, generated subgoal images, episode quality metadata, speed labels, mistake labels, and control-mode labels.

The paper's main idea is not just "scale robot data." It is:

**If the training data contains many tasks, robots, strategies, and quality levels, the model needs to know what kind of behavior each episode represents. Rich context makes that diversity usable instead of confusing.**

That is why the paper calls the model steerable. At test time, the user can steer it by prompting for high quality, no mistakes, a desired speed, a subtask instruction, and sometimes a generated visual subgoal.

## The Central Research Question

The paper is trying to answer a robotics version of the foundation-model question:

**Can a single robot foundation model absorb a very broad, mixed-quality, cross-robot dataset and then recombine the skills inside that data to solve new physical tasks?**

This splits into several sharper questions.

First, can one generalist model match specialist robot policies on hard dexterous tasks? In robotics, specialists often win because they are fine-tuned for one task, one robot, and one evaluation condition. A generalist model is more useful only if it can avoid being mediocre everywhere.

Second, can the model follow language well enough to do the right thing in messy scenes? This is harder than it sounds. If a dataset usually contains one dominant behavior in a scene, a robot model may ignore language and just imitate the dataset bias.

Third, can skills transfer across embodiments? If a laundry-folding skill is learned on one bimanual robot, can it work on a different bimanual UR5e system with different arm length, dynamics, workspace, and grasp strategy?

Fourth, can the model compose old skills into new tasks? This is the robotics analogue of a language model recombining familiar concepts into a new instruction. The paper treats this as a central sign of generalist behavior.

The authors' answer is that pi0.7 shows strong signs of all four, and that the key enabler is not only model scale, but context-rich training.

## Why This Is A Hard Problem

Robot learning has a data problem that looks different from text pretraining.

Text data is cheap, abundant, and naturally diverse. Robot data is expensive, embodied, and highly contextual. A robot trajectory is not just "what happened." It depends on the robot body, camera views, gripper type, control mode, operator quality, task strategy, scene setup, object positions, and what counted as success.

If you mix all of that together naively, the model may learn an average of incompatible behaviors. A slow failed attempt and a fast clean demonstration might share the same instruction text. A task performed by a lightweight bimanual robot might require a different strategy on a larger industrial arm. A human video might contain useful physical concepts but no direct robot actions.

So the core bottleneck is not only data volume. It is data ambiguity.

pi0.7's design is a response to that ambiguity. The model is trained with extra context that says, in effect:

- what the task is,
- what substep is currently relevant,
- what the near-future scene should look like,
- how good this episode was,
- how fast it was,
- whether this segment contained a mistake,
- which control mode generated the action.

The paper's deeper thesis is that diverse robot data becomes more valuable when the model can condition on the latent "mode" of the episode.

## Background: What Is A Vision-Language-Action Model?

A vision-language-action model, or VLA, maps observations and instructions to robot actions.

The observation usually includes camera images and robot proprioception, such as joint positions. The input might be:

- front camera image,
- wrist camera images,
- recent visual history,
- joint state,
- language instruction.

The output is not a single action. Modern VLAs often output an action chunk: a short sequence of future actions. The robot executes part of that chunk, then the model replans.

pi0.7 uses the same broad VLA template as earlier Physical Intelligence models. It has:

- a vision-language model backbone,
- a memory-style visual history encoder,
- an action expert that predicts continuous action chunks with a flow-matching objective.

Flow matching is a generative modeling approach. In this context, the action expert learns to generate plausible future action chunks conditioned on the visual-language context. This matters because robot actions are often multimodal: there may be several valid ways to grasp, fold, pull, or place an object.

The paper also uses the "knowledge insulation" recipe from earlier VLA work. The idea is to protect the vision-language backbone from unstable action gradients by supervising it through more stable token objectives, while letting the action expert attend to the backbone representations.

The core novelty of pi0.7 is not a totally new VLA architecture. It is the way the model is trained and prompted with richer multimodal context.

## The Main Idea: Diverse Context Conditioning

Earlier pi models mainly used a short language task description as context. pi0.7 expands the context.

The model's prompt can include:

1. a task instruction,
2. a subtask instruction,
3. one or more subgoal images,
4. episode metadata,
5. a control mode label,
6. proprioception and visual observations.

This turns the model from a plain instruction follower into a context-conditioned policy. It is trained to understand not just "what task is this?" but "what kind of episode is this, what step am I in, and what strategy should I imitate?"

That is the key conceptual shift. In a mixed dataset, the same instruction might correspond to many different behaviors. Rich context helps separate those behaviors.

For example, suppose the dataset contains laundry folding episodes that vary in speed and quality. If the model only sees "fold the shirt," it has to average across careful folds, messy folds, slow folds, partial failures, and different robot strategies. But if the prompt includes quality, speed, and mistake labels, the model can learn which action patterns correspond to good, fast, mistake-free execution.

At test time, the user can then prompt the model toward the desired mode: high quality, fast enough, no mistakes.

## The Prompt Components

### Task And Subtask Instructions

The task instruction describes the overall goal, such as "clean up the kitchen" or "fold the shirt."

The subtask instruction describes the current semantic step, such as "open the fridge door" or "pick up the peeler." This can be provided by a human coach or generated by a learned high-level policy.

This is important for long-horizon tasks. A robot may not be able to infer every step from a broad instruction in a cluttered kitchen. Subtask prompting gives it a local target.

The paper also uses this for coaching. If a new task is too hard to perform from a single instruction, a human can walk the robot through it step by step. Those coaching traces can later train a high-level policy that produces the subtask instructions automatically.

### Subgoal Images

Language can be too coarse for physical manipulation. The instruction "open the fridge door" does not tell the robot exactly how the handle should be grasped or what the scene should look like after progress.

pi0.7 can condition on subgoal images: generated images of the desired near-future state. These are multi-view images, so they can show both scene-level outcomes and gripper-level details.

The subgoal images are generated by a lightweight world model initialized from BAGEL, a large multimodal image generation/editing model. The world model takes the current observation, the subtask instruction, and metadata, then produces future goal images. The VLA uses these images as additional context.

This creates a bridge from non-robot visual knowledge to robot control. If the world model has learned broad visual concepts from web-scale image/video data, it can help specify what the robot should aim for even when the robot policy has never seen that exact task.

### Episode Metadata

Episode metadata is one of the most important parts of the paper.

The metadata includes:

- speed, represented as binned episode length,
- quality, scored from 1 to 5,
- mistake labels, such as whether a segment contains an error,
- control mode, such as joint-level or end-effector control.

The purpose is to make suboptimal data usable. Instead of filtering out lower-quality rollouts, the model can train on them while knowing they are lower quality or mistake-containing. At test time, the user prompts for the desirable metadata: high quality, no mistake, and an appropriate speed.

This is very similar in spirit to conditional generation. A language model trained on many styles can be prompted for one style. pi0.7 trains on many behavior qualities and strategies, then is prompted for the desired behavior mode.

### Prompt Dropout

The model is trained with dropout over prompt components. Sometimes subgoal images are absent. Sometimes metadata is absent. Sometimes subtask instructions are dropped when subgoal images are present.

This makes the model robust to different test-time prompting configurations. It can run with a minimal prompt, with language only, with metadata, with generated subgoals, or with combinations of these.

This is practical. In real robotics, some context sources may be unavailable or too slow at runtime.

## The Model Architecture

pi0.7 has about 5B parameters.

The major pieces are:

- a 4B vision-language backbone initialized from Gemma 3,
- a vision encoder included in that backbone,
- a MEM-style visual history encoder,
- an 860M-parameter action expert.

The model can process up to four camera views: a front view, two wrist views, and sometimes a rear view. It can use up to six history frames per view. It can also process up to three subgoal images, omitting the rear view for subgoals.

The visual history encoder compresses multiple frames so the model can use temporal context without exploding the token count. This is important for tasks that require memory: finding an object after opening a drawer, remembering which mugs have already been moved, or tracking progress through a multi-step task.

The action expert outputs 50 action tokens, corresponding to a chunk of 50 low-level steps. The system executes only part of the chunk before replanning. The paper uses real-time action chunking techniques to handle inference latency smoothly.

At runtime, pi0.7 can also use classifier-free guidance on metadata. In diffusion-style generative models, classifier-free guidance pushes samples toward a condition. Here, the condition might be high quality or no mistake. The authors use moderate guidance weights to elicit stronger dexterous performance.

## Training Data

The paper emphasizes that pi0.7 is trained on a deliberately broad mixture.

The data includes:

- robot demonstrations across many tasks,
- data from many robot platforms,
- in-house lab and home-like environments,
- in-the-wild home environments,
- autonomous policy evaluation rollouts,
- human interventions during rollouts,
- lower-quality demonstrations,
- failure episodes,
- open-source robot datasets,
- egocentric human video data,
- auxiliary web data,
- visual question answering,
- object localization and attribute prediction,
- text-only prediction,
- video-language tasks.

The striking point is that the authors do not restrict training to clean expert demonstrations. They intentionally include messy, suboptimal, autonomous, and non-robot data.

Why? Because this data contains useful states, recovery situations, strategies, and long-tail interactions. A failure can still teach the model something about the world, as long as the model knows it was a failure. An autonomous rollout from a specialist policy can teach the generalist model a specialized behavior. A human video can teach visual and semantic structure even if it does not directly provide robot actions.

The paper calls this partly a distillation process. pi0.7 can absorb behavior from RL-trained specialist policies by training on their evaluation rollouts, then represent those capabilities inside a single generalist model.

## Runtime Behavior

At test time, pi0.7 is configured depending on the desired behavior.

The model is always prompted with control mode and episode metadata. The metadata is set to the desirable mode:

- quality = 5,
- mistake = false,
- speed chosen per task, roughly based on fast successful episodes.

The subtask instruction can come from a human coach or from a learned high-level language policy. If subgoal images are used, the world model refreshes them when the subtask changes or every few seconds.

The resulting control loop is:

1. observe the robot state and scene,
2. choose or receive a subtask instruction,
3. generate subgoal images if using goal conditioning,
4. assemble task, subtask, metadata, control mode, observation, and subgoal context,
5. generate an action chunk,
6. execute part of it,
7. update context and repeat.

This is why the model is called steerable. The user or high-level policy can keep changing the context, and the same low-level VLA can adapt its behavior.

## Experimental Setup

The experiments are broad rather than centered on one benchmark.

The paper evaluates pi0.7 on:

- dexterous out-of-the-box tasks,
- tasks requiring memory,
- broad instruction following in unseen environments,
- complex referential instructions,
- tasks that deliberately contradict dataset biases,
- cross-embodiment transfer,
- new short-horizon tasks,
- new long-horizon tasks taught by language coaching,
- scaling and ablation studies around dataset diversity and metadata.

The robots include mobile bimanual manipulators, static bimanual manipulators, single-arm systems, and bimanual UR5e systems. The UR5e setup is especially important for cross-embodiment transfer because it differs substantially from the source robots used for many tasks.

The metrics vary by task:

- success rate,
- normalized throughput,
- task progress percentage,
- scoring rubrics for multi-step tasks.

This variety is a strength and a weakness. It lets the authors evaluate many real robot behaviors, but it also means there is no single clean benchmark number that summarizes the whole paper.

## Result 1: Out-Of-The-Box Dexterity

The first major result is that pi0.7 performs hard dexterous tasks out of the box, without task-specific post-training.

The evaluated tasks include:

- making espresso,
- folding laundry,
- box building,
- making a peanut butter sandwich,
- turning a shirt inside out,
- driving through a door,
- slicing zucchini,
- peeling fruits and vegetables,
- taking out trash.

For several tasks, the comparison is against RL-finetuned or SFT specialist policies from earlier pi0.6 systems. The paper reports that a single pi0.7 model matches the specialist policies on the evaluated tasks and even exceeds specialist throughput for diverse laundry folding and box building.

This is an important result because robotics often rewards specialization. If every useful task needs its own fine-tuning run, the system is not a general-purpose robot foundation model. pi0.7's claim is that a single model can absorb enough diverse behavior to compete with specialists on several hard tasks.

The ablations make the result more informative:

- pi0.7 without autonomous evaluation data performs worse.
- pi0.7 without episode metadata also performs worse.
- The gap is especially visible in throughput.

The interpretation is that autonomous data from strong policies is useful, but only when the model has metadata to understand which behaviors are good, fast, or mistaken.

## Result 2: Memory-Dependent Tasks

The paper evaluates tasks that require remembering prior observations or prior progress:

- swapping three mugs,
- finding an object,
- scooping coffee,
- window cleaning.

pi0.7 performs similarly to or better than task-specific pi0.6-MEM specialists. This result matters because many real manipulation tasks require temporal state. The robot may need to remember which drawer it opened, which item was moved, or whether a step has already been completed.

The MEM-style history encoder is doing practical work here. It gives the model a compact way to condition on recent visual history rather than treating every moment as a stateless image-to-action mapping.

## Result 3: Instruction Following

The paper then tests whether pi0.7 can follow diverse language instructions in unseen kitchens and bedrooms. The tasks involve 3 to 6 step sequences in messy environments. The reported result is that pi0.7 substantially improves over pi0.5 and pi0.6.

The more interesting tests are the ones that are designed to break language following.

### Complex Referential Instructions

The authors create instructions that refer to objects indirectly or spatially, such as asking for an object one would use for a purpose, or for the fruit on the largest plate.

Prior models can handle simple rearrangement instructions but struggle with these complex references. pi0.7 does better, and pi0.7 with generated subgoal images does better still.

This is a useful signal that the world model is importing semantic knowledge into control. The subgoal image can translate a vague or relational language instruction into a visual target.

### Breaking Dataset Biases

The authors also test "reverse" tasks.

In the dataset, bussing might usually mean putting trash in the trash bin and dishes in the bussing bin. The reverse task asks for the opposite. Similarly, a fridge-to-microwave task is reversed by asking the robot to move food from the microwave to the fridge.

This is a clever evaluation because it tests whether the model listens to the instruction or just follows the most common behavior in the data.

pi0.7 improves over prior models. In the reverse microwave-to-fridge task, generated subgoal images are especially important. The paper's interpretation is that the world model can generate a visual goal from the text instruction, helping the VLA overcome its action-data bias.

## Result 4: Cross-Embodiment Transfer

Cross-embodiment transfer asks whether a skill learned on one robot can transfer to another robot body.

For simple object rearrangement tasks, pi0.6 and pi0.7 both show some transfer. But as the embodiment gap grows, pi0.7 becomes stronger. The hardest cases involve transferring skills between smaller static bimanual robots and larger UR5e systems.

The most striking example is laundry folding. The training folding data comes from smaller static bimanual robots, but the evaluation happens on a bimanual UR5e system. The UR5e robot has different arm geometry, different reachable workspace, higher inertia, and different grasp constraints. The correct strategy is not simply copying the source robot's motion.

The paper reports that pi0.7 can fold towels and shirts on the UR5e system, and that generated subgoal images improve performance.

The qualitative result is particularly interesting. On the source robot, human operators often use tilted end-effector approaches. On the UR5e, pi0.7 discovers more vertical grasp strategies that fit the new body better. This suggests the model is not merely replaying source embodiment motions. It is adapting the skill to a new morphology.

The human comparison is also notable. In a zero-shot shirt folding study on the UR5e:

- expert human teleoperators achieved 90.9% task progress and 80.6% success,
- pi0.7 with generated subgoals achieved 85.6% task progress and 80% success.

This does not mean pi0.7 is generally as good as expert humans. It means that in this specific zero-shot transfer setup, on this specific task and robot, its measured performance was comparable to experienced operators trying the UR5e shirt-folding task without practice.

That is still scientifically interesting. It suggests that skills collected on cheaper or easier-to-teleoperate robots may transfer to more difficult platforms.

## Result 5: Compositional Task Generalization

The paper treats compositional generalization as a central goal: can the model recombine known skills into new tasks?

For short-horizon unseen tasks, pi0.7 can often perform directly from a prompt. Examples include:

- pressing a French press plunger,
- scooping rice into a rice cooker,
- wiping office objects with a cloth,
- spinning articulated objects like a desk fan.

The authors say no robot data was explicitly collected for these tasks. But they are careful later to note that in large diverse datasets, "unseen" is difficult to prove in the strong sense. Related skills may appear elsewhere.

For longer-horizon unseen tasks, direct prompting is not enough. The paper uses language coaching.

The long-horizon coached tasks include:

- loading an air fryer,
- unloading an air fryer,
- toasting a bagel.

A human gives step-by-step subtask instructions. pi0.7 follows those instructions much better than prior models, especially with generated subgoal images.

Then the authors take the coaching episodes and train a high-level language policy that automatically generates the right subtask prompts. This produces autonomous versions of the tasks without collecting new teleoperated low-level action demonstrations.

This is one of the paper's most important workflow ideas:

**You can teach a robot a new long-horizon task by coaching its language interface, then distilling that coaching into a high-level policy, instead of collecting full low-level teleoperation data.**

That is a different model of robot task acquisition. It treats language coaching as a scalable supervision channel.

## Result 6: Scaling With Mixed-Quality Data

The final experimental section asks whether pi0.7 can actually benefit from more diverse, mixed-quality data.

The authors study laundry folding data split into four buckets:

- top 30% by quality and speed,
- top 50%,
- top 80%,
- all data.

They train models with and without metadata. The result is:

- without metadata, performance can degrade as more lower-quality data is added,
- with metadata, performance continues improving as more data is added.

This supports the paper's central thesis. More data helps only if the model can disambiguate the modes inside the data. Metadata turns lower-quality or varied data from a liability into a training signal.

They also test task diversity by removing either:

- the most diverse 20% of robot data,
- a random 20% of robot data.

Removing the most diverse data hurts more than removing a random amount of data. The interpretation is that high task diversity contributes disproportionately to generalization on unseen short-horizon tasks.

## What Is Convincing?

The most convincing part of the paper is the breadth of real-robot evaluation. The authors are not only reporting simulated benchmarks or narrow pick-and-place tasks. They test messy, physical, long-horizon, dexterous tasks across multiple robot bodies.

The second convincing part is the ablation around metadata. The paper does not merely claim that richer prompts help. It shows that removing metadata hurts, and that models without metadata can get worse when more mixed-quality data is added. That is strong evidence for the paper's main mechanism.

The third convincing part is the cross-embodiment section. The qualitative examples are exactly what one would want from real transfer: the target robot uses a different strategy suited to its body. If robust, that is more meaningful than simply repeating source-robot motions.

The fourth convincing part is the coaching workflow. It is a practical path from "robot can follow language" to "robot can acquire new autonomous tasks." That is an important bridge because full low-level robot demonstration collection is expensive.

## What Should We Be Careful About?

### The evaluation is broad, but not always standardized

The paper evaluates many tasks with different rubrics. That is realistic for robotics, but it makes the results harder to compress into one clean number. Some tasks use success rate, some task progress, some normalized throughput, and some custom scoring.

This is not a flaw by itself. Real robot evaluation is messy. But it means the reader should avoid treating the paper as one simple benchmark victory.

### "Unseen task" is hard to define

The authors are transparent about this. With a huge diverse dataset, it is difficult to know whether a task is truly new or whether related behaviors appeared under different labels or as substeps of other tasks.

This matters for claims about compositional generalization. The strongest version would be "the model invented a new skill." The more defensible version is "the model recombined capabilities from its broad training distribution in useful new ways."

The second claim is still important, and it is probably the right interpretation.

### Subgoal generation is powerful but expensive

The world model uses a 14B image generation backbone and multi-GPU inference optimizations. The appendix reports that generating subgoal images is computationally expensive, though made practical with tensor parallelism, quantization, and asynchronous execution.

This raises deployment questions. A system that needs several H100s for subgoal generation may be practical in a lab or fleet setting, but not necessarily cheap or simple for every robot.

### Metadata labels require annotation infrastructure

The method depends on quality labels, speed labels, and mistake labels. Some can be automatic, but others rely on human annotation. The approach is scalable only if the annotation pipeline is manageable.

The broader lesson is that data scale alone is not enough. The paper is also an argument for metadata infrastructure.

### Safety and reliability remain open

Success rates of 60-80% for unseen tasks are exciting for research, but many real-world robotic applications require much higher reliability, explicit safety handling, recovery policies, and strong guarantees under distribution shift.

The paper shows an important step toward generalist robot capability, not a finished household robot.

## Questions A Strong PhD Student Would Ask

1. **Which context component matters most for which capability?** Metadata matters for mixed-quality data. Subgoal images matter for referential and cross-embodiment tasks. Subtask language matters for coaching. A deeper factorial ablation could map each component to each capability.

2. **How reliable are the metadata labels?** If quality or mistake labels are noisy, how gracefully does the model degrade? Could the model learn label shortcuts?

3. **Can the model be steered into unsafe modes?** A steerable model can be prompted for high quality, but also perhaps for fast or risky behavior. What constraints govern safe prompting?

4. **How much non-robot data actually transfers?** The paper uses egocentric human video and web data, especially through the world model. It would be useful to isolate how much each non-robot source contributes.

5. **Does coaching scale beyond carefully selected tasks?** Language coaching is promising, but the paper's coached tasks are still structured and manually selected. How much coaching is needed for messy real deployment?

6. **Can the system recover from failures autonomously?** Training includes failures and mistake labels, but deployment reliability will depend on recognizing, recovering from, and replanning after mistakes.

7. **What is the real cost-performance curve?** The policy itself can run on one H100, while subgoal generation is more expensive. Understanding the tradeoff between language-only prompting and generated visual goals is important for practical deployment.

## The Big Picture

pi0.7 is best read as a paper about how to make robot data scale.

The naive scaling recipe is: collect more robot trajectories and train a bigger model.

The pi0.7 recipe is more nuanced:

1. collect broad data, even if it is heterogeneous and imperfect,
2. label the data with useful context about quality, speed, mistakes, and strategy,
3. include subtask and visual goal context,
4. train the model to handle missing context through dropout,
5. prompt the model at test time toward the desired behavior mode,
6. use language coaching and high-level policies to acquire new tasks.

This is a major difference. The paper suggests that generalist robotics may require not just larger datasets, but better-conditioned datasets.

In text modeling, a document often carries its own context. In robotics, the context is often external: how the episode was collected, how good it was, what strategy was intended, what robot body was used, and what step the operator was trying to execute. pi0.7 makes that context explicit.

## The Takeaway

The key idea in pi0.7 is that a robot foundation model becomes more general when it can distinguish the modes inside its training data.

The model is trained on a very diverse mixture: demonstrations, failures, autonomous rollouts, specialist policy behavior, human videos, web data, and auxiliary vision-language data. That mixture would normally be dangerous because it contains conflicting qualities and strategies. pi0.7 makes it usable by conditioning on rich prompts: subtask language, subgoal images, episode metadata, and control mode.

The empirical results show strong out-of-the-box dexterity, improved instruction following, cross-embodiment transfer, language-coached new task acquisition, and better scaling with mixed-quality data when metadata is present.

The cautious interpretation is:

**pi0.7 does not prove solved general robotics. It shows that rich context conditioning can turn messy, diverse robot data into a much more useful training signal.**

That is the paper's durable lesson.

## Memory Checklist

- pi0.7 is a 5B VLA from Physical Intelligence.
- It uses a Gemma 3-based VLM backbone, MEM-style visual history, and an 860M flow-matching action expert.
- The main novelty is diverse context conditioning, not just bigger model scale.
- The prompt can include task language, subtask language, subgoal images, metadata, control mode, and proprioception.
- Episode metadata includes speed, quality, and mistake labels.
- Metadata lets the model learn from mixed-quality data without averaging good and bad behaviors together.
- Subgoal images are generated by a world model initialized from BAGEL.
- Subgoal images help translate semantic intent into visual targets.
- The model can match specialist policies on several dexterous tasks out of the box.
- It improves over prior pi models on broad language following and complex referential instructions.
- It shows cross-embodiment transfer, including laundry folding on a UR5e robot without UR5e folding data.
- Human study: expert teleoperators got 90.9% progress and 80.6% success on zero-shot UR5e shirt folding; pi0.7 with generated subgoals got 85.6% progress and 80% success.
- Language coaching lets humans teach new long-horizon tasks through subtask instructions, then train a high-level policy to automate those prompts.
- Scaling result: with metadata, more mixed-quality data helps; without metadata, more mixed-quality data can hurt.
- The main open questions are reliability, safety, annotation cost, subgoal generation cost, and how to define truly unseen tasks in a huge dataset.
