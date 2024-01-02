// HTML Elements
const btn = document.querySelector("button");
const intsy = document.querySelector("#intensity");
const mins = document.querySelector("#mins");
const equip = document.querySelector("#equipment");
const mucls = document.querySelector("#muscle")

// When select options are empty
const msg = document.querySelector(".message")

// Generate exercises with HTML element selectors
const exercises_h1 = document.querySelector(".workout-header")
const exercises_ul = document.querySelector(".exercises")



// Generate exercise routine when button has been clicked
btn.addEventListener("click", clicked);


function clicked() {
    // Check to see if all fields have been selected and not left blank
    if (intsy.options[intsy.selectedIndex].text === "" || mins.options[mins.selectedIndex].text === "" ||
        equip.options[equip.selectedIndex].text === "" || mucls.options[mucls.selectedIndex].text === "") {

        // Delete any possible displayed exercise routine to emphasize error message
        exercises_h1.innerHTML = ""
        exercises_ul.innerHTML = ""
        // Show error message if all fields have not been changed
        msg.innerHTML = "<p>Please Fill All Fields Before Generating Routines.</p>";
    }
    else {
        // Take away possible previous error message since all fields have been selected
        msg.innerHTML = "";

        // Take away possible previous generated routine
        exercises_ul.innerHTML = ""

        // Intensity
        const intsyInput = intsy.options[intsy.selectedIndex].text;
        // Time (in minutes)
        const minsInput = mins.options[mins.selectedIndex].text;
        // Equipment
        const equipInput = equip.options[equip.selectedIndex].text;
        // Tagetted Muscle
        const muclsInput = mucls.options[mucls.selectedIndex].text;

        // All The exercises suggested
        const num_of_exercises = time[minsInput][0]
        const num_of_sets = time[minsInput][1]
        const rest = time[minsInput][2]

        // # of reps shy from failuer based off javascript object literal below
        const reps = intsylvl[intsyInput]

        // Array used to check to see if randomly selected index is new
        // So no repeated exercises are generated
        const new_indices = []

        // Display what kind of muscle groups the routine is based off of
        exercises_h1.innerHTML = `${muclsInput} Targeted Workout Routine:`

        while (new_indices.length != num_of_exercises) {
            let num = Math.random()
            num *= 12 // there are 12 kinds of exercises in every category currently
            let indice = Math.floor(num)

            if (new_indices.includes(indice) == false) {
                new_indices.push(indice)

                const getData = () => {
                    fetch("workout.json")
                        .then((response) => {
                            return response.json();
                        })
                        .then((data) => {
                            new_exercise = document.createElement("li")
                            new_exercise.textContent = `${data[equipInput][muclsInput][indice]} for ${num_of_sets} sets 
                            and ${reps} reps shy from failure with ${rest} minutes of rest between sets`;
                            exercises_ul.appendChild(new_exercise);
                        })
                }

                // Display exercise on page
                getData();


            }
        }

    }
    // Set form elements back to default
    intsy.selectedIndex = "none";
    mins.selectedIndex = "none";
    equip.selectedIndex = "none";
    mucls.selectedIndex = "none";

}

var intsylvl = {
    // Associated with your will to workout
    "Light Day": 5,
    "A Solid Workout": 2,
    "Giving it everything you got!": 1,
}

var time = {
    "30": [1, 5, 1],
    "60": [2, 4, 2],
    "90": [3, 4, 2.5],
    "120": [4, 4, 3],
}