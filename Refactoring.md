# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

This version of code is more readable and cleaner than the orginal because :

1. It uses a funtion to encode the desired output and change in algo to encode can be easily handled, it also makes it more readable because instead of reading the chained the function (.createHash.update.disgest) twice it is now available as an exportable function which accepts any data to encode
2. reduced number of if else statements make is easier to follow along and using ternary operator also allows for a more readable safe navigation.
3. Assigning an initial value to candidate makes it safe (candidiate cannot be null anymore, if there is no input) to return without using another if (or an else) condition.
4. Since most of the operations were on candidate and operations on candidate arr depedent if there is an input, I wrapped the majority code inside an if(event) condition, which makes ir very easy to read if there is no input, return candidate, whose initial value is TRIVIAL_PARTITION_KEY
