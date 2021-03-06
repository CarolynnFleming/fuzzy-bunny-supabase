import { 
    checkAuth, 
    deleteBunny, 
    getFamilies, 
    logout,
} from '../fetch-utils.js';

checkAuth();

const familiesEl = document.querySelector('.families-container');
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

async function displayFamilies() {
    // fetch families from supabase
    const families = await getFamilies();
    // clear out the familiesEl
    familiesEl.textContent = '';

    for (let family of families) {
         // create three elements for each family, one for the whole family, on  to hold the name, and one to hold the bunnies
        const famBamEl = document.createElement('div');
        const famNamEl = document.createElement('h3');
        const famBunnyEl = document.createElement('div');
        // add the bunnies css class to the bunnies el, and family css class to the family el
        famBamEl.classList.add('family');
        famBunnyEl.classList.add('bunnies');
        

        // put the family name in the name element
        famNamEl.textContent = family.name;

        famBamEl.append(famNamEl, famBunnyEl);
        // for each of this family's bunnies
        for (let bunny of family.fuzzy_bunnies) {
            const bunniesEl = document.createElement('p');

            bunniesEl.classList.add('bunny');

            bunniesEl.addEventListener('click', async() => {
                await deleteBunny(bunny.id);
                displayFamilies();
            });
            bunniesEl.textContent = `${bunny.name}`;
            famBunnyEl.append(bunniesEl);
        }
        // make an element with the css class 'bunny', and put the bunny's name in the text content
        
        // add an event listener to the bunny el. On click, delete the bunny, then refetch and redisplay all families.

        familiesEl.append(famBamEl);
        // append this bunnyEl to the bunniesEl
    }

    // append the bunniesEl and nameEl to the familyEl

    // append the familyEl to the familiesEl
}

window.addEventListener('load', async() => {
    const families = await getFamilies();

    displayFamilies(families);
});