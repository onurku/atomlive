import { Sequelize } from "sequelize";

//app
import AccountModel from "@/lib/database/models/account";
import CartItemMappingModel from "./models/cart_item_mapping";
import CartModel from "@/lib/database/models/cart";
import ChildModel from "@/lib/database/models/child";
import CommissionModel from "@/lib/database/models/commission";
import ContentModel from "@/lib/database/models/content";
import EventModel from "@/lib/database/models/event";
import EventSeriesModel from "@/lib/database/models/event_series"; //event series
import InvitationModel from "@/lib/database/models/event_series";
import ItemModel from "@/lib/database/models/item";
import ItemTypeModel from "@/lib/database/models/item_type";
import LanguagesAndRegions from "@/lib/database/models/languages_and_regions";
import RoleModel from "@/lib/database/models/roles";
import SeriesContentMappingModel from "@/lib/database/models/series_content_mapping";
import SeriesModel from "@/lib/database/models/series"; // used to map ContentModel x SeriesModel
import SeriesEventMappingModel from "@/lib/database/models/series_event_mapping"; // used to map EventModel x EventSeriesModel
import StripeAccountsModel from "@/lib/database/models/stripe_accounts";
import SubscriptionModel from "@/lib/database/models/subscription";
import SubscriptionLengthModel from "@/lib/database/models/subscription_length";
import UserModel from "@/lib/database/models/user";
import UserLanguageMapping from "@/lib/database/models/user_language_mapping";
import UserRoleMappingModel from "@/lib/database/models/user_role_mapping";
import VerificationTokenModel from "@/lib/database/models/verification_token";

const url = `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
// console.log("url - ", url);

const sequelize = new Sequelize(url, {
  logging: console.log
});

const User = UserModel(sequelize, Sequelize);
const Child = ChildModel(sequelize, Sequelize);
const Account = AccountModel(sequelize, Sequelize);

const LanguageAndRegion = LanguagesAndRegions(sequelize, Sequelize);
const Role = RoleModel(sequelize, Sequelize);
const VerificationToken = VerificationTokenModel(sequelize, Sequelize);
const UserLanguageMap = UserLanguageMapping(sequelize, Sequelize);
const UserRoleMap = UserRoleMappingModel(sequelize, Sequelize);

const Content = ContentModel(sequelize, Sequelize);
const Series = SeriesModel(sequelize, Sequelize);
const SeriesContentMap = SeriesContentMappingModel(sequelize, Sequelize);

const Item = ItemModel(sequelize, Sequelize);
const ItemType = ItemTypeModel(sequelize, Sequelize);

const Cart = CartModel(sequelize, Sequelize);
const CartItemMap = CartItemMappingModel(sequelize, Sequelize);

const Event = EventModel(sequelize, Sequelize);
const EventSeries = EventSeriesModel(sequelize, Sequelize);
const SeriesEventMap = SeriesEventMappingModel(sequelize, Sequelize);

const Subscription = SubscriptionModel(sequelize, Sequelize);
const SubscriptionLength = SubscriptionLengthModel(sequelize, Sequelize);

const Invitation = InvitationModel(sequelize, Sequelize);

const Commission = CommissionModel(sequelize, Sequelize);

const StripeAccounts = StripeAccountsModel(sequelize, Sequelize);

Cart.belongsToMany(Item, {
  through: CartItemMap,
  foreignKey: "cart_id"
});
Content.belongsToMany(Series, {
  through: SeriesContentMap,
  foreignKey: "content_id"
});
Event.belongsToMany(EventSeries, {
  through: SeriesEventMap,
  foreignKey: "event_id"
});
Item.belongsToMany(Cart, {
  through: CartItemMap,
  foreignKey: "item_id"
});
LanguageAndRegion.belongsToMany(User, {
  through: UserLanguageMap,
  foreignKey: "language_id"
  // otherKey: "user_id"
});
Role.belongsToMany(User, {
  through: UserRoleMap,
  foreignKey: "role_id"
  // otherKey: "user_id"
});
Series.belongsToMany(Content, {
  through: SeriesContentMap,
  foreignKey: "series_id"
});
EventSeries.belongsToMany(Event, {
  through: SeriesEventMap,
  foreignKey: "event_series_id"
});
User.belongsToMany(Role, {
  through: UserRoleMap,
  foreignKey: "user_id"
  // otherKey: "user_id"
});
User.belongsToMany(LanguageAndRegion, {
  through: UserLanguageMap,
  foreignKey: "user_id"
  // otherKey: "language_id"
});

sequelize
  .sync({
    logging: false
    // alter: true
    // force: false, //never set to true, it will delete db and recreate empty db
    // alter: true, //!DO NOT ENABLE
    // logging: console.log
  })
  .then(async () => {})
  // uncomment below to create data in db, but has to be commented out after dating is added
  // .then(async () => {
  // const roles = [
  //   {
  //     role: "parent"
  //   },
  //   {
  //     role: "author"
  //   },
  //   {
  //     role: "teacher"
  //   },
  //   {
  //     role: "child"
  //   },
  //   {
  //     role: "publisher"
  //   },
  //   {
  //     role: "atom-admin"
  //   }
  // ];
  // const languages = [
  //   {
  //     language_code: "arb",
  //     language: "Arabic",
  //     regional: "Arabic",
  //     language_name_regional: "عربي"
  //   },
  //   {
  //     language_code: "cy",
  //     language: "Welsh",
  //     regional: "Welsh",
  //     language_name_regional: "Cymraeg"
  //   },
  //   {
  //     language_code: "da",
  //     language: "Danish",
  //     regional: "Danish",
  //     language_name_regional: "Dansk"
  //   },
  //   {
  //     language_code: "de",
  //     language: "German",
  //     regional: "German",
  //     language_name_regional: "Deutsch"
  //   },
  //   {
  //     language_code: "en",
  //     language: "English",
  //     regional: "English",
  //     language_name_regional: "English"
  //   },
  //   {
  //     language_code: "es",
  //     language: "Spanish",
  //     regional: "Spanish, Castillian",
  //     language_name_regional: "Castellano"
  //   },
  //   {
  //     language_code: "fr",
  //     language: "French",
  //     regional: "French",
  //     language_name_regional: "Français"
  //   },
  //   {
  //     language_code: "in",
  //     language: "Hindi",
  //     regional: "Hindi",
  //     language_name_regional: "Hindi"
  //   },
  //   {
  //     language_code: "is",
  //     language: "Icelandic",
  //     regional: "Icelandic",
  //     language_name_regional: "Íslenskur"
  //   },
  //   {
  //     language_code: "it",
  //     language: "Italian",
  //     regional: "Italian",
  //     language_name_regional: "Italiano"
  //   },
  //   {
  //     language_code: "jp",
  //     language: "Japanese",
  //     regional: "Japanese",
  //     language_name_regional: "日本"
  //   },
  //   {
  //     language_code: "ko",
  //     language: "Korean",
  //     regional: "Korean",
  //     language_name_regional: "Korean"
  //   },
  //   {
  //     language_code: "no",
  //     language: "Norwegian",
  //     regional: "Norwegian",
  //     language_name_regional: "Norwegian"
  //   },
  //   {
  //     language_code: "nl",
  //     language: "Dutch",
  //     regional: "Dutch",
  //     language_name_regional: "Nederlands"
  //   },
  //   {
  //     language_code: "po",
  //     language: "Polish",
  //     regional: "Polish",
  //     language_name_regional: "Polish"
  //   },
  //   {
  //     language_code: "pt",
  //     language: "Portuguese",
  //     regional: "Portuguese",
  //     language_name_regional: "Português"
  //   },
  //   {
  //     language_code: "ro",
  //     language: "Romanian",
  //     regional: "Romanian",
  //     language_name_regional: "Română"
  //   },
  //   {
  //     language_code: "ru",
  //     language: "Russian",
  //     regional: "Russian",
  //     language_name_regional: "русский"
  //   },
  //   {
  //     language_code: "sv",
  //     language: "Swedish",
  //     regional: "Swedish",
  //     language_name_regional: "Svenska"
  //   },
  //   {
  //     language_code: "tr",
  //     language: "Turkish",
  //     regional: "Turkish",
  //     language_name_regional: "Türkçe"
  //   },
  //   {
  //     language_code: "vn",
  //     language: "Vietnamese",
  //     regional: "Vietnamese",
  //     language_name_regional: "Tiếng Việt"
  //   },
  //   {
  //     language_code: "de-at",
  //     language: "German",
  //     regional: "German, Austria",
  //     language_name_regional: "Österreichisches Deutsch"
  //   },
  //   {
  //     language_code: "de-ba",
  //     language: "German",
  //     regional: "German, Bavarian",
  //     language_name_regional: "Bayerisch"
  //   },
  //   {
  //     language_code: "de-be",
  //     language: "German",
  //     regional: "German, Berlin",
  //     language_name_regional: "Berlinerisch"
  //   },
  //   {
  //     language_code: "de-ch",
  //     language: "German",
  //     regional: "German, Switzerland",
  //     language_name_regional: "Schwiizerdütsch"
  //   },
  //   {
  //     language_code: "en-au",
  //     language: "English",
  //     regional: "English, Australia",
  //     language_name_regional: "English"
  //   },
  //   {
  //     language_code: "en-gb",
  //     language: "English",
  //     regional: "English, Great Britain",
  //     language_name_regional: "English"
  //   },
  //   {
  //     language_code: "en-in",
  //     language: "English",
  //     regional: "English, India",
  //     language_name_regional: "English"
  //   },
  //   {
  //     language_code: "en-us",
  //     language: "English",
  //     regional: "English, US",
  //     language_name_regional: "English"
  //   },
  //   {
  //     language_code: "es-can",
  //     language: "Spanish",
  //     regional: "Spanish, Canary Islands",
  //     language_name_regional: "Español"
  //   },
  //   {
  //     language_code: "es-car",
  //     language: "Spanish",
  //     regional: "Spanish, Caribbean Islands",
  //     language_name_regional: "Español"
  //   },
  //   {
  //     language_code: "es-cat",
  //     language: "Catalan",
  //     regional: "Catalan",
  //     language_name_regional: "Catàleg"
  //   },
  //   {
  //     language_code: "es-mx",
  //     language: "Spanish",
  //     regional: "Spanish, Mexico",
  //     language_name_regional: "Español"
  //   },
  //   {
  //     language_code: "es-rio",
  //     language: "Spanish",
  //     regional: "Spanish, Rioplatense",
  //     language_name_regional: "Español"
  //   },
  //   {
  //     language_code: "es-us",
  //     language: "Spanish",
  //     regional: "Spanish, US",
  //     language_name_regional: "Español"
  //   },
  //   {
  //     language_code: "fr-ca",
  //     language: "French",
  //     regional: "French, Canada",
  //     language_name_regional: "Français"
  //   },
  //   {
  //     language_code: "cn-ma",
  //     language: "Chinese",
  //     regional: "Cantonese",
  //     language_name_regional: "中國普通話"
  //   },
  //   {
  //     language_code: "cn-ca",
  //     language: "Chinese",
  //     regional: "Mandarin",
  //     language_name_regional: "中國普通話"
  //   },
  //   {
  //     language_code: "in-asm",
  //     language: "Assamese",
  //     regional: "Assamese",
  //     language_name_regional: "Assamese"
  //   },
  //   {
  //     language_code: "in-ben",
  //     language: "Bengali",
  //     regional: "Bengali",
  //     language_name_regional: "Bengali"
  //   },
  //   {
  //     language_code: "in-guj",
  //     language: "Gujarati",
  //     regional: "Gujarati",
  //     language_name_regional: "Gujarati"
  //   },
  //   {
  //     language_code: "in-kan",
  //     language: "Kannada",
  //     regional: "Kannada",
  //     language_name_regional: "Kannada"
  //   },
  //   {
  //     language_code: "in-mai",
  //     language: "Maithili",
  //     regional: "Maithili",
  //     language_name_regional: "Maithili"
  //   },
  //   {
  //     language_code: "in-mar",
  //     language: "Marathi",
  //     regional: "Marathi",
  //     language_name_regional: "Marathi"
  //   },
  //   {
  //     language_code: "in-may",
  //     language: "Malayalam",
  //     regional: "Malayalam",
  //     language_name_regional: "Malayalam"
  //   },
  //   {
  //     language_code: "in-odi",
  //     language: "Odia",
  //     regional: "Odia",
  //     language_name_regional: "Odia"
  //   },
  //   {
  //     language_code: "in-pun",
  //     language: "Punjabi",
  //     regional: "Punjabi",
  //     language_name_regional: "Punjabi"
  //   },
  //   {
  //     language_code: "in-tam",
  //     language: "Tamil",
  //     regional: "Tamil",
  //     language_name_regional: "Tamil"
  //   },
  //   {
  //     language_code: "in-tel",
  //     language: "Telugu",
  //     regional: "Telugu",
  //     language_name_regional: "Telugu"
  //   },
  //   {
  //     language_code: "in-urd",
  //     language: "Urdu",
  //     regional: "Urdu",
  //     language_name_regional: "Urdu"
  //   },
  //   {
  //     language_code: "pt-br",
  //     language: "Portuguese",
  //     regional: "Portuguese, Brazil",
  //     language_name_regional: "Português"
  //   },
  //   {
  //     language_code: "vn-cen",
  //     language: "Vietnamese",
  //     regional: "Vietnamese, Central",
  //     language_name_regional: "Tiếng Việt"
  //   },
  //   {
  //     language_code: "vn-nor",
  //     language: "Vietnamese",
  //     regional: "Vietnamese, North",
  //     language_name_regional: "Tiếng Việt"
  //   },
  //   {
  //     language_code: "vn-sou",
  //     language: "Vietnamese",
  //     regional: "Vietnamese, South",
  //     language_name_regional: "Tiếng Việt"
  //   }
  // ];

  // const subcriptionLengths = [
  //   {
  //     name: "free"
  //   },
  //   {
  //     name: "monthly"
  //   },
  //   {
  //     name: "semi-annually"
  //   },
  //   {
  //     name: "annually"
  //   },
  //   {
  //     name: "annually-enterprise"
  //   }
  // ];

  // const commission = [
  //   {
  //     commission: 0.18,
  //     commission_teacher: 0,
  //     commission_publisher: 0.82
  //   },
  //   {
  //     commission: 0.3,
  //     commission_teacher: 0,
  //     commission_publisher: 0.7
  //   },
  //   {
  //     commission: 0.3,
  //     commission_teacher: 0.7,
  //     commission_publisher: 0
  //   },
  //   {
  //     commission: 1,
  //     commission_teacher: 0,
  //     commission_publisher: 0
  //   }
  // ];

  // const subscription = [
  //   {
  //     commission_id: 1,
  //     price: 29,
  //     subscription_length_id: 4 //4: annual subscription, 5: enterprise annual
  //   }
  // ];

  // const itemTypes = [
  //   {
  //     name: "content",
  //     description: "one single item of content, such as a book."
  //   },
  //   {
  //     name: "series",
  //     description: "group of content."
  //   },
  //   {
  //     name: "event",
  //     description: "one event"
  //   },
  //   {
  //     name: "event_series",
  //     description: "one group of events"
  //   }
  // ];

  // const lang = await LanguageAndRegion.bulkCreate(languages);
  // const r = await Role.bulkCreate(roles);
  // const s = await SubscriptionLength.bulkCreate(subcriptionLengths);
  // const sub = await Subscription.bulkCreate(subscription);
  // const c = await Commission.bulkCreate(commission);
  // const item = await ItemType.bulkCreate(itemTypes);

  // if (r && lang && s && c && item) {
  //   console.log("successful init");
  // }
  // })
  .catch((e) => {
    console.log("Connection Error:", e);
    // process.exit(2);
  });

export {
  sequelize,
  Account,
  Cart,
  CartItemMap,
  Child,
  Commission,
  Content,
  Event,
  EventSeries,
  Item,
  ItemType,
  Invitation,
  LanguageAndRegion,
  Role,
  Series,
  SeriesContentMap,
  SeriesEventMap,
  StripeAccounts,
  Subscription,
  SubscriptionLength,
  User,
  UserLanguageMap,
  UserRoleMap,
  VerificationToken
};
