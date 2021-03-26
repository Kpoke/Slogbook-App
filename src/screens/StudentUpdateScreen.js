import React, { useState, useCallback } from "react";
import { View, StyleSheet, Alert, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";

import Input from "../shared/components/input";
import { verifyEmail, checkIfEmpty } from "../utility";
import * as actions from "../store/actions";

const StudentUpdate = () => {
  const { loading, token } = useSelector((state) => state.auth);

  const [address, setAddress] = useState("");
  const [allowance, setAllowance] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [startDate, setStartDate] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyLocation, setCompanyLocation] = useState("");
  const [companyNumber, setCompanyNumber] = useState("");
  const [industrySuperFirstName, setIndustrySuperFirstName] = useState("");
  const [industrySuperLastName, setIndustrySuperLastName] = useState("");
  const [industrySuperPhoneNumber, setIndustrySuperPhoneNumber] = useState("");
  const [industrySuperPost, setIndustrySuperPost] = useState("");
  const [industrySuperEmail, setIndustrySuperEmail] = useState("");

  const dispatch = useDispatch();
  const updateStudent = useCallback(
    (formData, token) => dispatch(actions.updateStudent(formData, token)),
    [dispatch]
  );

  const update = () => {
    if (!verifyEmail(industrySuperEmail)) return;
    if (
      checkIfEmpty(
        address,
        phoneNumber,
        startDate,
        companyName,
        companyLocation,
        companyNumber,
        industrySuperEmail,
        industrySuperFirstName,
        industrySuperLastName,
        industrySuperPhoneNumber,
        industrySuperPost
      )
    ) {
      return Alert.alert("Fill all Entries");
    }

    let authIndustryObject = {
      industrySuperName: industrySuperFirstName + " " + industrySuperLastName,
      industrySuperUsername: industrySuperFirstName,
      industrySuperPassword: industrySuperLastName,
      industrySuperPhoneNumber,
      industrySuperPost,
      industrySuperEmail,
    };
    updateStudent(
      {
        address,
        allowance,
        phoneNumber,
        startDate,
        companyName,
        companyLocation,
        companyNumber,
        authIndustryObject,
      },
      token
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
        }}
      >
        <Input placeholder="Address During Training" setVar={setAddress} />
        <Input
          placeholder="Allowance (if any)"
          setVar={setAllowance}
          extras={{ keyboardType: "phone-pad" }}
        />
        <Input
          placeholder="Phone Number"
          setVar={setPhoneNumber}
          extras={{ keyboardType: "phone-pad" }}
        />
        <Input
          placeholder="Date Training Would Start (mm/dd/yyyy)"
          setVar={setStartDate}
          extras={{ keyboardType: "phone-pad" }}
        />
        <Input placeholder="Name of Company" setVar={setCompanyName} />
        <Input placeholder="Location of Company" setVar={setCompanyLocation} />
        <Input
          placeholder="Company Phone Number"
          setVar={setCompanyNumber}
          extras={{ keyboardType: "phone-pad" }}
        />
        <Input
          placeholder="Industry Supervisor First Name"
          setVar={setIndustrySuperFirstName}
        />
        <Input
          placeholder="Industry Supervisor Last Name"
          setVar={setIndustrySuperLastName}
        />
        <Input
          placeholder="Industry Supervisor Phone Number"
          setVar={setIndustrySuperPhoneNumber}
          extras={{ keyboardType: "phone-pad" }}
        />
        <Input
          placeholder="Industry Supervisor Post"
          setVar={setIndustrySuperPost}
        />
        <Input
          placeholder="Industry Supervisor Email"
          setVar={setIndustrySuperEmail}
        />

        <Button
          style={styles.buttonContainer}
          mode="contained"
          color="#62e2f0"
          loading={loading}
          labelStyle={{
            fontSize: 17,
            fontWeight: "bold",
          }}
          onPress={update}
        >
          Update Account
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  input: {
    height: 50,
    width: 300,
  },
  inputContainer: {
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 10,
    width: 300,
  },
});

export default StudentUpdate;
