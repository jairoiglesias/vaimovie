import { useNavigation } from '@react-navigation/core'
import React, {useEffect, useState, useCallback} from 'react'
import { Keyboard, StyleSheet, Text, Image, View, SafeAreaView, FlatList, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import { mainAPI } from '../api'
import { debounce } from "lodash";


const Home = () => {

    const [titles, setTitles] = useState([])
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation()

    useEffect(() => {
       fetchMovies()
    }, [])

    const fetchMovies = async () => {
        setLoading(true)

        const {data: dataSample1} = await mainAPI.get('/search/Avengers')
        const {data: dataSample2} = await mainAPI.get('/search/Matrix')
        const {data: dataSample3} = await mainAPI.get('/search/Spiderman')

        setTitles([
            ...dataSample1.titles,
            ...dataSample2.titles,
            ...dataSample3.titles
        ])

        setLoading(false)
    }

    const fetchMoviesByTitle = async (title) => {
        setLoading(true)

        const {data} = await mainAPI.get(`/search/${title}`)

        setTitles([
            ...data.titles,
        ])

        Keyboard.dismiss()

        setLoading(false)
    }

    const handleDetails = item => {
        navigation.navigate('Details', {
            id: item.id
        })
    }

    const handleOnChangeText = debounce((text) => {
        fetchMoviesByTitle(text)
    }, 1000)

    const _renderItem = ({item}) => {
        console.log('renderItem', item)
        return (
            <TouchableOpacity 
                style={styles.cardContainer}
                onPress={() => handleDetails(item)}
            >
                <Image 
                    source={{
                        uri: item.image
                    }}
                    style={{
                        width: '45%',
                        height: 200
                    }}
                />
                
                <View style={{
                    margin: 10,
                    flex: 1
                }}>
                    <Text style={styles.movieTitle}>{item.title}</Text>
                </View>
                    
            </TouchableOpacity>
        )
    }

    return (
        
        <View style={styles.container}>
            
            <Text style={styles.mainTitle}>Vai Movie</Text>
            <TextInput 
                style={styles.textInput}
                placeholder={'Busca'}
                returnKeyType={'done'}
                onChangeText={handleOnChangeText}
            />
            {loading && <View style={{justifyContent: 'center', flex: 1}}>
                <ActivityIndicator size={'large'}/>
            </View>
            }
            {!loading && <FlatList 
                renderItem={_renderItem}
                data={titles}
                showsVerticalScrollIndicator={false}
                style={{
                    width: '100%',
                    // backgroundColor: 'red'
                }}
            />}
        </View>
        
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: 'rgb(39, 59, 76)',
        flex: 1,
        padding: 10
    },
    textInput: {
        backgroundColor: 'white',
        width: '95%',
        height: 40,
        borderRadius: 10,
        marginVertical: 20,
        padding: 10
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: 'rgb(75, 89, 105)',
        margin: 10,
        borderRadius: 10,
    },
    mainTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24,
        marginVertical: 20
    },
    movieTitle: {
        color: 'white',
        fontWeight: 'bold',
    },
    companyTitle: {
        fontSize: 10
    }
})
