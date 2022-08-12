import {
  StyleSheet,
  Text,
  View,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../utils/Colors';
import {commonStyles} from '../../utils/commonStyles';
import * as api from '../../networking/api';
import * as payload from '../../networking/payload';
import * as request from '../../networking/request';

const OffenceStation = ({onSelect = () => {}, ID_List = []}) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const ID_GET = async () => {
    setLoading(true);
    const response = await request.GetRequestWithAuthentication(
      api.offencesAPI(),
    );
    if (response.success) {
      setLoading(false);
      console.log('getAPI offence', response);
    } else {
      if (response.hasOwnProperty('error') && response.error.length > 0) {
        setErrors(response.error);
      } else {
        console.log('.show eror', response);
        Alert.alert('Error', JSON.stringify(response.error));
      }
    }
  };

  useEffect(() => {
    ID_GET();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.modalView}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{'Select ID'}</Text>
        </View>
        <View style={styles.body}>
          <ScrollView>
            {ID_List.map((value, index) => {
              return (
                <TouchableOpacity
                  onPress={() => onSelect(value.id)}
                  key={index}
                  style={styles.accountType}>
                  <Text style={styles.accountTypeText}>{value.id}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default OffenceStation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    width: '80%',
    height: 200,
    borderRadius: 10,
    padding: 16,
    backgroundColor: Colors.white,
    ...commonStyles.shadow,
  },
  header: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3b5998',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  body: {
    width: '100%',
    marginTop: 16,
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  accountType: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3b5998',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 10,
  },
  accountTypeText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
