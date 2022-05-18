import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

const App = () => {
  const [toggle, setToggle] = useState(false) 

  const handleChangeToggle = () => setToggle(oldToggle => !oldToggle);          

  useEffect(() => {
    //liga flash do smartphone
    Torch.switchState(toggle);
  }, [toggle]);

  useEffect(() => {
    const subscription = RNShake.addListener(()=>{
      setToggle(oldToggle => !oldToggle); 
    });
    //Esta função irá ser chamada quando o components for desmontado
    return () => subscription.remove();
  }, []);

  return (
  <View style={toggle ? style.containerLight : style.containerDark}>
    <TouchableOpacity onPress={handleChangeToggle}>
      <Image 
        style={toggle ? style.lightingOn : style.lightingOff }
        source={
          toggle
            ? require('./assets/icons/eco-light.png' )
            : require('./assets/icons/eco-light-off.png')
        }
      />
      <Image 
        style={style.dioLogo}
        source={
          toggle
            ? require('./assets/icons/logo-dio.png' )
            : require('./assets/icons/logo-dio-white.png')
        }
      />
    </TouchableOpacity>
  </View>
  );
};

export default App;

const style = StyleSheet.create({
containerDark: {
  flex:1,
  backgroundColor:'black',
  alignItens: 'center',
  justifyContent: 'center',
},
containerLight: {
  flex:1,
  backgroundColor:'white',
  alignItens: 'center',
  justifyContent: 'center',
},
lightingOn:{
  resizeMode: 'contain',
  alignSelf: 'center',
  width: 150,
  height:150,
},
lightingOff:{
  resizeMode: 'contain',
  alignSelf: 'center',
  tintColor: 'white',
  width: 150,
  height:150,
},
dioLogo: {
  resizeMode: 'contain',
  alignSelf: 'center',
  width:250,
  height: 250,
}


});