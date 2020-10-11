## Assignment 11 and 12 Questions

Note: this questions file is designed to help you document what you've done in your assignment. It is important as this is the way we will understand what you have done for grading.

An example `QUESTIONS.md` file is in the `Examples` directory (QUESTIONS-example.md).

## Assignment 11

The rubric has a list of 13 items.

Item 2: List at least 3 distinct behaviors. If you have made more than 3, list up to 5 and choose the ones you think are most interesting. A single sentence describing each one should be sufficient.

2.A: Drone flying complex trails and banks in air.
2.B: Forklift loading concrete
2.C: Crane rotating and loading stuff
2.D: Car running on a splined curve with tension equal to 1
2.E: People walking back and forth on the road

Item 3: Do you have a spline train track? What object should we look at? How do we know it's a spline?
Yes, it is the yellow truck running in the outer loop of the town. Looking at the object called truck-0 or drive that will be good enough.
I have also provided a track that the car runs on, and if we look from above, it is obvious that the curve is a spline.

Item 4: Do you have a train that faces forward on the track and is ridable?
Yes, it is the track mentioned above -- the outer loop of the town.

Optional Complexity Points: For each one that you've done, give the number (5-13) on the list, describe the behavior, and tell us what object we can see it on. This might take 2-3 sentences per item.

Item 5: the drone flying above is following a banked curve. Looking from above shows that the curve is "8" shaped, and looking from the sides shows that the drone flys up and down.

Item 6: snows falling in the town.

Item 7: the crane, the forklift, and the two people walking on the avenue all do secondary behaviors. Crane moves randomly and loads by moving the wire (Crane); forklift goes between two destinations and loads stuff (forklift-0); the pedestrains moves back and forth by turning their bodies (Human - 2 and Human - 4).

Item 13: the flag in front of the church waves in the wind and cloth behavior is obvious. (flag)

List which other "Behavior Challenges" you completed (from the list of 13 - anything 5 and above). For each, give the number as well as a short (1 sentence is OK) description. And tell us where in the world to see it (what object should we "lookat" and/or "ride"):

None

## Assignment 12

Object Diversity: List 8 of the different kinds of objects that appear in your world. If you made more than 8 kinds of objects, only list the 8 that are most interesting visually.

O.1 Skyscraper from old assignment 7. (it is called building-#number in the object list)
O.2 Car running on a splined curve. Car is from old assignment 7.
O.3 Billboard streaming the town.
O.4 Drone flying on a banking curve in the sky from old assignment 7.
O.5 Forklift loading things. Forklift from old assignment 7.
O.6 Flag waving in front of the church
O.7 A radar that monitors the town's safety from old assignment 10.
O.8 A torusknot monument reflecting the surrounding

Object Diversity: list one object in your world that is loaded from a model file (e.g., OBJ or FBX). Remember to give proper attribution in your README file, and to include the object in your repository.
I loaded trees that is planted around the avenues.

Object Diversity: list one of each category
Building: Skyscraper (it is called building-#number in the object list)
Natural Element: Trees
Vehicle (object meant to move): Yellow car in the outer loop. (it is called truck-0 in the object list).

Technical Challenges: For each technical challenge you attempted (from the list of 7), give the number of the challenge, a description of what you did, and a description of the object that it was used on. What objects should we "look at".
1. Flag waving in the wind is curved.
2. The torusknot monument in the park area is surrounded by environment map that reflects the background.
3. The radar screen is implemented with fragment shader.
6. Screen in front of the church used render-to-texture technique

Pictures: confirm that you placed the required pictures in the Pictures directory.
Yes. 
Consent: do you agree to allow us to use your pictures in future gallery pages? (please answer Yes or No)
Yes.
