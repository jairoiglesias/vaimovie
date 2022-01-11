import React, {useState, useEffect} from 'react'
import { useNavigation, useRoute } from '@react-navigation/core';
import { StyleSheet, ScrollView, Text, View, Image, ActivityIndicator, TouchableOpacity } from 'react-native'

import { mainAPI } from '../api';

const Details = props => {

    const [movieDetails, setMovieDetails] = useState({})
    const [loading, setLoading] = useState(false)
    
    const navigation = useNavigation()
    const route = useRoute()

    const fetchMovieDetails = async (id) => {
        setLoading(true)
        const {data} = await mainAPI.get(`/film/${route.params.id}`)
        setMovieDetails(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchMovieDetails()
    }, [])

    const ItemDetail = ({label, text}) => {
        return (
            <View style={{marginVertical: 10}}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.text}>{text}</Text>
            </View>
        )
    }

    const BackButton = () => {
        return (
            <TouchableOpacity
                onPress={() => navigation.goBack()}
            >
                <Text style={[styles.text, {
                    fontSize: 16,
                    marginHorizontal: 10,
                    marginVertical: 30
                }]}>{'Voltar'}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            {loading && <View style={{justifyContent: 'center', flex: 1}}>
                <ActivityIndicator size={'large'}/>
            </View>
            }
            {!loading && <>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{justifyContent: 'center'}}
            >
            <BackButton />
            <Image 
                source={{
                    uri: movieDetails.poster
                }}
                style={{
                    width: '90%',
                    height: 400,
                    alignSelf: 'center'
                }}
                resizeMode='contain'
            />
            
            <View style={{
                margin: 10,
                flex: 1
            }}>
                <ItemDetail label={'Descrição'} text={movieDetails.plot}/>
                <ItemDetail label={'Ano'} text={movieDetails.year}/>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <ItemDetail label={'Duração'} text={movieDetails.length}/>
                    <ItemDetail label={'Nota'} text={movieDetails.rating}/>
                </View>

                <Text style={styles.label}>Elenco</Text>
                {movieDetails.cast?.map(castItem => {
                    return <View 
                        key={castItem.actor_id}
                        style={{
                            flexDirection: 'row',
                        }}
                    >
                        <Text style={styles.text}>{castItem.actor}</Text>
                        <Text style={[styles.text, {fontWeight: '500', marginLeft: 10}]}>({castItem.character})</Text>
                    </View>
                })}
            </View>
                </ScrollView>
            </>}
        </View>
    )
}

export default Details

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: 'rgb(39, 59, 76)',
        flex: 1,
        padding: 10
    },
    label: {
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 5
    },
    text: {
        color: 'white',
        textAlign: 'justify',
        fontSize: 13
    },
})
