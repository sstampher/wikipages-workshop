const {db, Page, User} = require('./server/db');
const {green, red} = require('chalk');

// here's some sample data to get you started
// feel free to edit these or add your own!

const sampleUsers = [{
  name: 'Sophia Spencer',
  email: 'buglover1999@gmail.com'
}, {
  name: 'Rob Mark',
  email: 'american_explorer@yahoo.com'
}, {
  name: 'Katy Perry',
  email: 'kitty.purry@aol.com'
}];

const samplePages = [{
  title: 'UnBEElievable!',
  slug: 'unbeelievable',
  content: 'Bees are born fully grown! A bee has 5 eyelids! Honeybees navigate by using the sun as a compass! The wings of a bee beat about 11,400 times per minute!',
  status: 'open',
  authorId: 1
}, {
  title: 'Fun Beaver Facts',
  slug: 'fun_beaver_facts',
  content: 'Beavers can hold their breath for 45 minutes underwater! Beavers were once the size of bears! Beavers have orange teeth!',
  status: 'open',
  authorId: 2
}, {
  title: 'Cool Cats',
  slug: 'cool_cats',
  content: 'Cats have 2 sets of vocal cords; one for purring and one for meowing! Cats can hear ultrasound! Dogs can make about 10 sounds, while cats make about 100! Each cat has a nose ridged with a unique pattern, just like a human fingerprint!',
  status: 'open',
  authorId: 3
}];

const seed = async () => {
  try {
    await db.sync({force: true});

    await Promise.all(sampleUsers.map(user => {
      return User.create(user);
    }));
    await Promise.all(samplePages.map(page => {
      return Page.create(page);
    }));

    console.log(green('Seeding success!'));
    db.close();
  }
  catch (err) {
    console.error(red('Oh noes! Something went wrong!'));
    console.error(err);
    db.close();
  }
};

seed();
