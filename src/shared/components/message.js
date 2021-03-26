import React from "react";
import { Button, Card, Paragraph } from "react-native-paper";
import { ScrollView, View } from "react-native";

const Message = ({ message, role }) => {
  let subtitle = message.isReport ? "Logbook Entry" : "Enquiry";

  const showCommentButton = () => {
    if (role === "Supervisor" && !message.schoolSupervisorsComment) {
      return true;
    }
    if (role === "IndustrySupervisor" && !message.industrySupervisorsComment) {
      return true;
    }
    return false;
  };

  const handleCommentSubmission = () => {};

  const checkIfEmpty = (item) => {
    if (item) return item;
    return "Not yet Submitted";
  };
  return (
    <View>
      <ScrollView>
        <Card
          style={{
            marginTop: 50,
          }}
        >
          <Card.Title title={message.date} subtitle={subtitle} />
          {message.imageUrl ? (
            <Card.Cover source={{ uri: message.imageUrl }} />
          ) : null}
          <Card.Content>
            <Paragraph>{message.report}</Paragraph>
          </Card.Content>
          <Card.Title
            title={`Supervisor's Comment`}
            subtitle={checkIfEmpty(message.schoolSupervisorsComment)}
          />
          <Card.Title
            title={`Industry Supervisor's Comment`}
            subtitle={checkIfEmpty(message.industrySupervisorsComment)}
          />
          <Card.Title title="Score" subtitle={checkIfEmpty(message.score)} />
          {showCommentButton() ? (
            <Card.Actions>
              <Button onPress={handleCommentSubmission}>Comment</Button>
            </Card.Actions>
          ) : null}
        </Card>
      </ScrollView>
    </View>
  );
};

export default Message;
