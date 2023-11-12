import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  Image,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import React, {Component} from 'react';
import {ButtonIcon} from '../../../components';
import {Feed1, Feed2, Feed3, Feed4, Feed5} from '../../../assets';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faComment, faHeart} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {SliderBox} from 'react-native-image-slider-box';

export default class Public extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      idLikedProject: [],
    };
  }

  componentDidMount() {
    this.ambilDataApi();
    this.getLikeCurrentUser();
  }

  ambilDataApi = async () => {
    const result = await axios.get(
      'https://api-dev.smartedu5p.com/api/v1/projects?public=true&limit=100',
    );
    let data = result.data.data.projects;
    const dataPromise = data.map(async item => {
      try {
        const result = await axios.get(
          `https://api-dev.smartedu5p.com/api/v1/users/${item.teacher}`,
        );
        item.teacher = result.data.data.user;
        return item;
      } catch (error) {
        console.log(error, error.response?.data.message);
      }
    });
    data = await Promise.all(dataPromise);
    this.setState({data});
  };

  likeProject = async idProject => {
    try {
      await axios.post('https://api-dev.smartedu5p.com/api/v1/likes', {
        project: idProject,
      });
      Alert.alert('Sukses', 'Berhasil like');
      this.getLikeCurrentUser();
    } catch (error) {
      Alert.alert('Error', 'Gagal like. Silahkan coba lagi.');
    }
  };

  unlikeProject = async idProject => {
    try {
      await axios.delete('https://api-dev.smartedu5p.com/api/v1/likes', {
        data: {
          project: idProject,
        },
      });
      Alert.alert('Sukses', 'Berhasil unlike');
      this.getLikeCurrentUser();
    } catch (error) {
      console.log(error, error.response?.data.message);
      Alert.alert('Error', 'Gagal unlike. Silahkan coba lagi.');
    }
  };

  getLikeCurrentUser = async () => {
    try {
      const result = await axios.get(
        'https://api-dev.smartedu5p.com/api/v1/likes?limit=1000',
      );
      const data = result.data.data.likedProjectByUser;
      this.setState({
        idLikedProject: data.map(data => data.project.id),
      });
    } catch (error) {
      if (error.response?.status === 404) {
        this.setState({
          idLikedProject: [],
        });
      }
    }
  };

  render() {
    const projects = this.state.data;
    return (
      <View style={styles.page}>
        <ScrollView>
          {projects.length > 0 ? (
            projects?.map(project => {
              return (
                <View>
                  <View style={styles.hello}>
                    <ButtonIcon title="" type="profile" />
                  </View>
                  <View>
                    <Text style={styles.text}>
                      {` ${project.teacher?.school?.sekolah}`}
                    </Text>
                  </View>
                  <View>
                    <SliderBox
                      style={styles.Image}
                      images={project.result?.map(
                        result =>
                          `https://api-dev.smartedu5p.com/img/projects/results/${result}`,
                      )}></SliderBox>
                  </View>
                  <View style={styles.icon}>
                    <Pressable
                      onPress={() => {
                        !this.state.idLikedProject.includes(project.id)
                          ? this.likeProject(project.id)
                          : this.unlikeProject(project.id);
                      }}>
                      <FontAwesomeIcon
                        icon={faHeart}
                        color={
                          this.state.idLikedProject.includes(project.id)
                            ? '#ff0000'
                            : '#bababa'
                        }
                        size={30}
                        style={{marginRight: 15}}
                      />
                    </Pressable>
                    <FontAwesomeIcon
                      icon={faComment}
                      color="#FB0000"
                      size={30}
                    />
                  </View>
                  <View style={styles.caption}>
                    <Text style={{fontFamily: 'TitilliumWeb-Bold'}}>
                      {` ${project.teacher?.school?.sekolah}`}
                    </Text>
                    <Text style={{fontFamily: 'TitilliumWeb-Regular'}}>
                      {` ${project.description}`}
                    </Text>
                  </View>
                </View>
              );
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
