# Web Development Project 3 - *Flashcards 2*

Submitted by: **Alexander Pulido**

This web app: **helps users study English-to-Spanish phrases with guess checking, progress tracking, shuffling, and mastered-card removal**

Time spent: **10** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **The user can enter their guess into an input box *before* seeing the flipside of the card**
  - Application features a clearly labeled input box with a submit button where users can type in a guess
  - Clicking on the submit button with an **incorrect** answer shows visual feedback that it is wrong
  - Clicking on the submit button with a **correct** answer shows visual feedback that it is correct
- [x] **The user can navigate through an ordered list of cards**
  - A forward/next button displayed on the card navigates to the next card in a set sequence when clicked
  - A previous/back button displayed on the card returns to the previous card in a set sequence when clicked
  - Both the next and back buttons have a visual disabled state at the beginning or end of the list, with no wrap-around navigation

## Optional Features

The following **optional** features are implemented:

- [x] Users can use a shuffle button to randomize the order of the cards
  - Cards remain in the same sequence unless the shuffle button is clicked
  - Cards change to a random sequence once the shuffle button is clicked
- [x] A user’s answer may be counted as correct even when it is slightly different from the target answer
  - Answers are normalized to ignore capitalization, punctuation, spacing, and accent differences
  - Partial matches are accepted for close answers
- [x] A counter displays the user’s current and longest streak of correct responses
  - The current counter increments when a user guesses an answer correctly
  - The current counter resets to 0 when a user guesses an answer incorrectly
  - A separate counter tracks the longest streak
- [x] A user can mark a card that they have mastered and have it removed from the pool of displayed cards
  - The user can mark a card to indicate that it has been mastered
  - Mastered cards are removed from the active deck and displayed in a mastered list

## Additional Features

- [x] Responsive layout with a dedicated study dashboard for progress stats
- [x] Empty-state message when the full deck has been mastered
- [x] Visual input validation states for correct and incorrect guesses

## Video Walkthrough

Here’s a walkthrough of implemented user stories:


https://github.com/phw/peek

<!-- Add your GIF or video link here when ready -->
https://imgur.com/a/BVv8ghq
## Notes

One of the main challenges was keeping navigation, shuffle order, and mastered-card removal in sync without breaking the user’s place in the deck. The app now resets per-card guess state cleanly whenever the active card changes.

## License

    Copyright 2026 Alexander Pulido

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
