import * as list from "@/ar_content/books/library/";

//atom
const {
  the_elves_and_the_shoemaker,
  the_king_of_the_birds,
  the_gifts_of_the_little_people,
  the_wolf_and_the_seven_goslings,
  the_queen_bee,
  old_mother_frost,
  the_three_sons_of_fortune,
  the_hare_and_the_hedgehog,
  the_frog_prince,
  rumpelstiltskin,
  the_three_little_men_in_the_woods,
  the_fairys_two_gifts,
  the_hut_in_the_forest,
  the_golden_goose,
  the_fisherman_and_his_wife,
  the_wonderful_travelers,
  hans_in_luck,
  the_twelve_huntsmen,
  the_town_musicians,
  goldilocks_and_the_three_bears,
  jack_and_the_magic_beanstalk,
  little_red_riding_hood,
  the_three_axes
} = list;

//cangrejo
const { the_little_apple_tree } = list;

//diveo_media
const {
  a_fun_walk,
  a_guest_on_a_farm,
  brighter_than_a_star,
  dont_cock_your_nose,
  forest_school,
  growing_a_garden,
  hello_puddle,
  how_to_follow_your_dream,
  the_imaginary_island,
  not_like_everyone_else,
  the_fruit_kingdom,
  the_lonely_puppy,
  the_union_of_three_planets,
  true_friendship,
  who_is_the_first
} = list;

//esther_leung_kong
const { wonderfully_made } = list;

//sokheap_heng
const { where_i_belong } = list;

const Languages = {
  ar: [],
  es: [],
  fr: [],
  de: [],
  "in-hi": [], //Hindi
  "in-guj": [], //Gujarati
  "in-pun": [], //Punjabi
  ru: [],
  tr: [],
  vn: []
};

const BookList = {
  atom: {
    name: "Atom",
    intro:
      "Your child may have grown up with Disney movies, but does he or she know about other popular fairy tales?<br/>Fairy tales are magical - princes and princesses, kings and queens, good fairies and evil witches. These characters provide kids with the ability to transform their imagination, take them to places they've never been before. Fairy tales inspire kids that anything is possible by allowing kids to escape from the real world and enter the world of their imagination.<br/>I recreated the original fairy tales for my nieces to enjoy, after realizing that they did not have much exposure to the classic ones. They love it, and often request that I read to them every time I visit. It's been our tradition to sit with each other and read, and they ask for new books every time. Here I am sharing them with you guys. Let their imaginations run wild and have fun!",
    publisher_uuid: "c79e062e-4fbf-46ed-adcf-fb05ff40a6a5",
    social: {
      instagram: "https://www.instagram.com/atomdotlive/",
      facebook: "https://www.facebook.com/atomdotlive/",
      tiktok: "https://www.facebook.com/atomdotlive/",
      banner:
        "https://uploads-ssl.webflow.com/5fd99a2f6eb4655d66b77a18/6310f33157227631497df477_banner.jpg",
      profile_photo:
        "https://uploads-ssl.webflow.com/5fd99a2f6eb4655d66b77a18/6310f33182ddda1987f23971_profile-photo.jpg"
    },
    content: {
      the_elves_and_the_shoemaker,
      the_king_of_the_birds,
      the_gifts_of_the_little_people,
      the_wolf_and_the_seven_goslings,
      the_queen_bee,
      old_mother_frost,
      the_three_sons_of_fortune,
      the_hare_and_the_hedgehog,
      the_frog_prince,
      rumpelstiltskin,
      the_three_little_men_in_the_woods,
      the_fairys_two_gifts,
      the_hut_in_the_forest,
      the_golden_goose,
      the_fisherman_and_his_wife,
      the_wonderful_travelers,
      hans_in_luck,
      the_twelve_huntsmen,
      the_town_musicians,
      goldilocks_and_the_three_bears,
      jack_and_the_magic_beanstalk,
      little_red_riding_hood,
      the_three_axes
    }
  },
  cangrejo: {
    intro: "",
    name: "Cangrejo",
    social: {},
    publisher_uuid: "3e4b6104-2ed5-40bb-91fb-b41746e38284",
    content: {
      the_little_apple_tree
    }
  },
  diveo_media: {
    intro:
      "Writing and creating fairy tales for children, we fulfill our mission - to carry the good for the smallest and most important inhabitants of this world. Each of our work - an attempt to make the world of kids brighter and warmer.",
    name: "Diveo Media",
    founder: "Altai Zeinalov, author and founder of Diveo Media",
    social: {
      instagram: "https://www.instagram.com/diveomedia/",
      twitter: "https://twitter.com/diveomedia",
      facebook: "https://www.facebook.com/diveomedia/",
      website: "https://diveomedia.com/",
      banner:
        "https://uploads-ssl.webflow.com/5fd99a2f6eb4655d66b77a18/63110b92d52f6e4b181e649f_banner.jpeg",
      profile_photo:
        "https://uploads-ssl.webflow.com/5fd99a2f6eb4655d66b77a18/6310f32a82ddda1664f23929_altai.png"
    },
    publisher_uuid: "223ac066-81d9-4745-bc8e-72915a7e8e57",
    content: {
      a_fun_walk,
      a_guest_on_a_farm,
      brighter_than_a_star,
      dont_cock_your_nose,
      forest_school,
      growing_a_garden,
      hello_puddle,
      how_to_follow_your_dream,
      the_imaginary_island,
      not_like_everyone_else,
      the_fruit_kingdom,
      the_lonely_puppy,
      the_union_of_three_planets,
      true_friendship,
      who_is_the_first
    }
  },
  esther_leung_kong: {
    intro: "",
    name: "Esther Leung Kong",
    social: {
      instagram: ""
    },
    content: {
      wonderfully_made
    }
  },
  sokheap_heng: {
    intro: "",
    name: "Sokheap Heng",
    content: {
      where_i_belong
    }
  }
};

export default BookList;
