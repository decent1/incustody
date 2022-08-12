import { StyleSheet, Text, View,TouchableOpacity,Image ,ScrollView} from 'react-native'
import React,{useState,useRef} from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Colors } from '../../utils/Colors'
import { Fonts } from '../../utils/Fonts'
import LinearGradient from 'react-native-linear-gradient';
import Input from '../Input/Input'
import { TextInput } from 'react-native-gesture-handler'
import {actions, RichEditor, RichToolbar} from "react-native-pell-rich-editor";
import { WebView } from 'react-native-webview';



const AttendeceTemplate = ({modalVisible}) => {
  const [title, setTitle] = useState('')
  const [senderName, setSenderName] = useState('')
  const [senderAddress, setSenderAddress] = useState('')
  const [replyToAddress, setReplyToAddress] = useState('')
  const [subjectLine, setSubjectLine] = useState('')
  const [emailContent, setEmailContent] = useState('')
  const [smsContent, setSmsContent] = useState('');

  const richText = useRef();
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text style={styles.title}>Agent - Attendance Accepted</Text>
            <AntDesign
              onPress={() => modalVisible()}
              name="closecircleo"
              size={20}
              color={Colors.gray}
            />
          </View>
          <Text style={styles.subTitle}>
            You can add a new template from here
          </Text>
          <Text style={[styles.inputTitle]}>{'TITLE'}</Text>
          <Input
            value={title}
            placeholder="Attendance Request Accepted"
            style={styles.input}
            placeholderTextColor={'#3E3F42'}
            onChangeText={text => setTitle(text)}
          />
          <Text style={[styles.inputTitle]}>{'SENDER NAME'}</Text>
          <Input
            value={senderName}
            placeholder="Sender Name"
            style={styles.input}
            placeholderTextColor={'#3E3F42'}
            onChangeText={text => setSenderName(text)}
          />
          <Text style={[styles.inputTitle]}>{'SENDER ADDRESS'}</Text>
          <Input
            value={senderAddress}
            placeholder="Address"
            style={styles.input}
            placeholderTextColor={'#3E3F42'}
            onChangeText={text => setSenderAddress(text)}
          />
          <Text style={[styles.inputTitle]}>{'REPLY TO ADDRESS'}</Text>
          <Input
            value={replyToAddress}
            placeholder="Reply Address"
            style={styles.input}
            placeholderTextColor={'#3E3F42'}
            onChangeText={text => setReplyToAddress(text)}
          />
          <Text style={[styles.inputTitle]}>{'SUBJECT LINE'}</Text>
          <Input
            value={subjectLine}
            placeholder="Subject Line"
            style={styles.input}
            placeholderTextColor={'#3E3F42'}
            onChangeText={text => setSubjectLine(text)}
          />
          <Text style={[styles.inputTitle]}>{'EMAIL CONTENT'}</Text>
          <View style={{borderWidth: 1, borderRadius: 5, padding: 10,borderColor:'#E2E5ED',height:200}}>
            <RichToolbar
              editor={richText}
              actions={[
                actions.heading1,
                actions.insertImage,
                actions.setBold,
                actions.setItalic,
                actions.insertBulletsList,
                actions.insertOrderedList,
                actions.insertLink,
                actions.keyboard,
                actions.setStrikethrough,
                actions.setUnderline,
                actions.removeFormat,
                actions.insertVideo,
                actions.checkboxList,
                actions.undo,
                actions.redo,
               
              ]}
              iconMap={{
                [actions.heading1]: ({tintColor}) => (
                  <Text style={[{color: tintColor}]}>H1</Text>
                ),
              }}
              
              onPressAddImage={()=>{console.log('Image')}}
            />
            <View>
              <RichEditor
                ref={richText}
                value={emailContent}
                onChangeText={text => setEmailContent(text)}
              />
            </View>
          </View>

          {/* <TextInput
            value={emailContent}
            style={styles.textArea}
            onChangeText={text => setEmailContent(text)}
            multiline={true}
            numberOfLines={4}
            placeholder=""
          /> */}
          <Text style={[styles.inputTitle]}>{'SMS CONTENT'}</Text>
          <Input
            value={smsContent}
            placeholder="SMS CONTENT"
            style={styles.input}
            placeholderTextColor={'#3E3F42'}
            onChangeText={text => setSmsContent(text)}
          />

          <TouchableOpacity>
            <LinearGradient
              colors={[Colors.primary, '#3b5998', '#192f6a']}
              style={styles.newMatter}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: Fonts.semiBold,
                  color: '#ffffff',
                }}>
                Update Template
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default AttendeceTemplate

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#001328',
    fontSize: 16,
  },
  subTitle: {
    color: '#9EA0A5',
    fontSize: 14,
    fontFamily: Fonts.regular,
    marginTop: 5,
  },
  inputTitle: {
    fontFamily: Fonts.regular,
    color: '#9EA0A5',
    fontSize: 14,
    marginTop: 10,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#E2E5ED',
    padding: 10,
  },
  input: {
    borderBottomColor: '#798593',
  },
  newMatter:{
    borderColor:Colors.primary,
    borderRadius:5,
    marginHorizontal:16,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:'10%'
  }
});