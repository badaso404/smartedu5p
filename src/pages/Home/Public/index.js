import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import React, {Component} from 'react';
import {ButtonIcon} from '../../../components';
import {Feed1, Feed2, Feed3, Feed4, Feed5} from '../../../assets';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faComment, faHeart} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default class Public extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.ambilDataApi();
  }

  ambilDataApi = () => {
    axios
      .get('https://api-dev.smartedu5p.com/api/v1/projects?public=true')
      .then(result => {
        const data = result.data.data.projects;

        data.map(item => {
          // https://api-dev.smartedu5p.com/api/v1/users/me
          if (item.teacher) {
            axios
              .get(
                `https://api-dev.smartedu5p.com/api/v1/users/${item.teacher}`,
              )
              .then(result => {
                item.teacher = result.data.user;
              });
          }
          return item;
        });

        this.setState({
          data: data,
        });
      });
  };

  render() {
    const projects = this.state.data;
    return (
      <View style={styles.page}>
        <ScrollView>
          {projects.length > 0 ? (
            projects?.forEach(project => {
              <View style={styles.hello}>
                <ButtonIcon title="" type="profile" />
              </View>;
              <View>
                <Text style={styles.text}> SMAN 1 Solo</Text>
              </View>;
              <View>
                <Image
                  style={styles.Image}
                  source={{
                    uri: 'https://api-dev.smartedu5p.com/img/users/profile/default.png',
                  }}></Image>
              </View>;
              <View style={styles.icon}>
                <FontAwesomeIcon
                  icon={faHeart}
                  color="#FB0000"
                  size={30}
                  style={{marginRight: 15}}
                />
                <FontAwesomeIcon icon={faComment} color="#FB0000" size={30} />
              </View>;
              <View style={styles.caption}>
                <Text style={{fontFamily: 'TitilliumWeb-Bold'}}>
                  {' '}
                  SMAN 1 Solo
                </Text>
                <Text style={{fontFamily: 'TitilliumWeb-Regular'}}>
                  ini adalah karya salah satu siswi dari SMAN 1 Solo yang
                  berteme membuat gambar 1 objek ini adalah karya salah satu
                  siswi dari SMAN 1 Solo yang berteme membuat gambar 1 objek
                </Text>
              </View>;
            })
          ) : (
            <Text
              style={{
                marginTop: 20,
                textAlign: 'center',
              }}>
              Belum ada project yang terpublish
            </Text>
          )}

          {/* <View style={styles.hello1}>
            <ButtonIcon title="" type="profile" />
          </View>
          <View>
            <Text style={styles.text}> SMAN 1 Sukoharjo</Text>
          </View>
          <View>
            <Image style={styles.Image} source={Feed2}></Image>
          </View>
          <View style={styles.icon}>
            <FontAwesomeIcon
              icon={faHeart}
              color="#FB0000"
              size={30}
              style={{marginRight: 15}}
            />
            <FontAwesomeIcon icon={faComment} color="#FB0000" size={30} />
          </View>
          <View style={styles.caption}>
            <Text style={{fontFamily: 'TitilliumWeb-Bold'}}>
              {' '}
              SMAN 1 Sukoharjo
            </Text>
            <Text style={{fontFamily: 'TitilliumWeb-Regular'}}>
              ini adalah karya salah satu siswi dari SMAN 1 Solo yang berteme
              membuat gambar 1 objek ini adalah karya salah satu siswi dari SMAN
              1 Solo yang berteme membuat gambar 1 objek
            </Text>
          </View>

          <View style={styles.hello2}>
            <ButtonIcon title="" type="profile" />
          </View>
          <View>
            <Text style={styles.text}> SMAN 3 Sukoharjo</Text>
          </View>
          <View>
            <Image style={styles.Image} source={Feed3}></Image>
          </View>
          <View style={styles.icon}>
            <FontAwesomeIcon
              icon={faHeart}
              color="#FB0000"
              size={30}
              style={{marginRight: 15}}
            />
            <FontAwesomeIcon icon={faComment} color="#FB0000" size={30} />
          </View>
          <View style={styles.caption}>
            <Text style={{fontFamily: 'TitilliumWeb-Bold'}}>
              {' '}
              SMAN 3 Sukoharjo
            </Text>
            <Text style={{fontFamily: 'TitilliumWeb-Regular'}}>
              ini adalah karya salah satu siswi dari SMAN 1 Solo yang berteme
              membuat gambar 1 objek ini adalah karya salah satu siswi dari SMAN
              1 Solo yang berteme membuat gambar 1 objek
            </Text>
          </View>

          <View style={styles.hello3}>
            <ButtonIcon title="" type="profile" />
          </View>
          <View>
            <Text style={styles.text}> SMAN 2 Surakarta</Text>
          </View>
          <View>
            <Image style={styles.Image} source={Feed4}></Image>
          </View>
          <View style={styles.icon}>
            <FontAwesomeIcon
              icon={faHeart}
              color="#FB0000"
              size={30}
              style={{marginRight: 15}}
            />
            <FontAwesomeIcon icon={faComment} color="#FB0000" size={30} />
          </View>
          <View style={styles.caption}>
            <Text style={{fontFamily: 'TitilliumWeb-Bold'}}>
              {' '}
              SMAN 2 Surakarta
            </Text>
            <Text style={{fontFamily: 'TitilliumWeb-Regular'}}>
              ini adalah karya salah satu siswi dari SMAN 1 Solo yang berteme
              membuat gambar 1 objek ini adalah karya salah satu siswi dari SMAN
              1 Solo yang berteme membuat gambar 1 objek
            </Text>
          </View>

          <View style={styles.hello4}>
            <ButtonIcon title="" type="profile" />
          </View>
          <View>
            <Text style={styles.text}> SMAN 1 Karanganyar</Text>
          </View>
          <View>
            <Image style={styles.Image} source={Feed5}></Image>
          </View>
          <View style={styles.icon}>
            <FontAwesomeIcon
              icon={faHeart}
              color="#FB0000"
              size={30}
              style={{marginRight: 15}}
            />
            <FontAwesomeIcon icon={faComment} color="#FB0000" size={30} />
          </View>
          <View style={styles.caption}>
            <Text style={{fontFamily: 'TitilliumWeb-Bold'}}>
              {' '}
              SMAN 1 Karanganyar
            </Text>
            <Text style={{fontFamily: 'TitilliumWeb-Regular'}}>
              ini adalah karya salah satu siswi dari SMAN 1 Solo yang berteme
              membuat gambar 1 objek ini adalah karya salah satu siswi dari SMAN
              1 Solo yang berteme membuat gambar 1 objek
            </Text>
          </View> */}
        </ScrollView>
      </View>
    );
  }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  hello: {
    marginTop: windowHeight * 0.01,
    flexDirection: 'row',
    position: 'absolute',
  },
  text: {
    paddingTop: 27,
    paddingLeft: 55,
    fontFamily: 'TitilliumWeb-Bold',
  },
  Image: {
    width: windowWidth * 1,
    height: windowHeight * 0.47,
    marginTop: 20,
  },
  icon: {
    flexDirection: 'row',
    marginHorizontal: 10,
    paddingTop: 5,
  },
  caption: {
    padding: 5,
    marginHorizontal: 5,
    paddingBottom: 50,
  },
  hello1: {
    marginTop: windowHeight * 0.77,
    flexDirection: 'row',
    position: 'absolute',
  },
  hello2: {
    marginTop: windowHeight * 1.54,
    flexDirection: 'row',
    position: 'absolute',
  },
  hello3: {
    marginTop: windowHeight * 2.3,
    flexDirection: 'row',
    position: 'absolute',
  },
  hello4: {
    marginTop: windowHeight * 3.06,
    flexDirection: 'row',
    position: 'absolute',
  },
});
