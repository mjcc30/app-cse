export default Messages = [
  {
    _id: 1,
    text: "Hello developer",
    user: {
      _id: 2,
      name: "React Native",
      avatar: "https://placeimg.com/140/140/any",
    },
    image: "https://placeimg.com/960/540/any",
  },
  {
    _id: 3,
    text: "Hi! I work from home today!",
    user: {
      _id: 1,
      name: "React Native",
      avatar: "https://placeimg.com/140/140/any",
    },
    image: "https://placeimg.com/960/540/any",
  },
  {
    _id: 4,
    text: "This is a quick reply. Do you love Gifted Chat? (radio) KEEP IT",
    user: {
      _id: 2,
      name: "React Native",
      avatar: "https://placeimg.com/140/140/any",
    },
    quickReplies: {
      type: "radio",
      keepIt: true,
      values: [
        {
          title: "😋 Yes",
          value: "yes",
        },
        {
          title: "📷 Yes, let me show you with a picture!",
          value: "yes_picture",
        },
        {
          title: "😞 Nope. What?",
          value: "no",
        },
      ],
    },
  },
  {
    _id: 5,
    text: "This is a quick reply. Do you love Gifted Chat? (checkbox)",
    user: {
      _id: 2,
      name: "React Native",
      avatar: "https://placeimg.com/140/140/any",
    },
    quickReplies: {
      type: "checkbox",
      values: [
        {
          title: "Yes",
          value: "yes",
        },
        {
          title: "Yes, let me show you with a picture!",
          value: "yes_picture",
        },
        {
          title: "Nope. What?",
          value: "no",
        },
      ],
    },
  },
  {
    _id: 6,
    text: "Come on!",
    user: {
      _id: 2,
      name: "React Native",
      avatar: "https://placeimg.com/140/140/any",
    },
  },
  {
    _id: 7,
    text:
      "Hello this is an example of the ParsedText, links like http://www.google.com or http://www.facebook.com are clickable and number 444-555-6666 #react #react-native",
    user: {
      _id: 1,
      name: "React Native",
      avatar: "https://placeimg.com/140/140/any",
    },
  },
];

Object {
  "_id": "d467bf75-4865-40ec-bbde-7146dc956bc0",
  "createdAt": 2020-08-07T05:37:25.499Z,
  "text": "Test",
  "user": Object {},
}

Object {
  "_id": "6c1cf6f0-befe-4462-800c-21f13606635c",
  "createdAt": 2020-08-07T05:39:02.261Z,
  "text": "Test",
  "user": Object {
    "_id": 1,
  },
}
