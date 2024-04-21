import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import Modal from "react-native-modal";
const Loader = ({ isVisible }) => {
  return (
    <>
    {
        isVisible?<Modal
        animationIn="pulse"
        animationOut="pulse"
        coverScreen={true}
        transparent={true}
        isVisible={isVisible}
        style={{ flex: 1 }}
      >
        <ActivityIndicator size="large" color="#32CCFE" />
      </Modal>:null
    }
      
    </>
  );
};

export default Loader;

const styles = StyleSheet.create({});
