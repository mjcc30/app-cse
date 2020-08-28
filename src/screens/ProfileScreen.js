import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
const { height, width } = Dimensions.get("window");
export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Users: [
        {
          _id: -1,
          name: "Amy Farha",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
        },
        {
          _id: 2,
          name: "Chris Jackson",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
        },
        {
          _id: 3,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
        {
          _id: 4,
          name: "Biplov Kumar",
          avatar: "https://www.tech9logy.com/app/Dummy/biplov.jpeg",
        },
        {
          _id: 5,
          name: "Meghaaaaa",
          avatar: "https://www.tech9logy.com/app/Dummy/user.png",
        },
        {
          _id: 6,
          name: "Nitiksha",
          avatar:
            "https://guruq.in/api/images/studentdoc/a1f925fb3b7b803a6a62581c70e1588229623443.jpeg",
        },
      ],
      search: "",
    };
  }
  renderItem = ({ item, index }) => {
    return (
      <ListItem
        Component={TouchableOpacity}
        title={item.name}
        onPress={() => this.handlePress(item, index)}
        leftAvatar={{ source: { uri: item.avatar }, size: height / 9 }}
        avatarStyle={{ height: height / 2, width: width / 2 }}
        bottomDivider
        chevron
      />
    );
  };
  handlePress = (item, index) => {
    console.log("iiiii", item, "in", index);
    this.props.navigation.navigate("Chat", { user: item });
  };
  updateSearch = (value) => {
    this.setState({ search: value });
  };
  render() {
    const { Users, search } = this.state;
    let _users = this.state.Users;
    let search1 = this.state.search.trim().toLowerCase();
    if (search1.length > 0) {
      _users = _users.filter(function (user) {
        return user.name.toLowerCase().match(search1);
      });
    }
    return (
      <View style={{ flex: 1 }}>
        <SearchBar
          placeholder="Type Here…"
          onChangeText={(val) => this.updateSearch(val)}
          value={search}
          lightTheme
          containerStyle={{
            backgroundColor: "#fff",
            borderWidth: 1,
            borderRadius: 20,
            borderColor: "#000",
          }}
          inputContainerStyle={{ backgroundColor: "#fff" }}
        />
        <FlatList data={_users} renderItem={this.renderItem} />
      </View>
    );
  }
}
