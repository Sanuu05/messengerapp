import * as React from "react";
import { FAB, Portal, PaperProvider } from "react-native-paper";
import { useFocusEffect, useNavigation } from '@react-navigation/native'
const FabButton = () => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;
const navigation = useNavigation()
  return (
    <PaperProvider>
      <Portal>
        <FAB.Group
          open={open}
          visible
          icon={open ? "close" : "plus"}
          actions={[
            // { icon: "plus", onPress: () => console.log("Pressed add") },
            {
              icon: "account-multiple",
              label: "Create Group",
              onPress: () => navigation.navigate('CreateGroup'),
            },
            // {
            //   icon: "email",
            //   label: "Email",
            //   onPress: () => console.log("Pressed email"),
            // },
            // {
            //   icon: "bell",
            //   label: "Remind",
            //   onPress: () => console.log("Pressed notifications"),
            // },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    </PaperProvider>
  );
};

export default FabButton;
