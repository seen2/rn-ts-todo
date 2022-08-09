import { View, Text, Switch, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useState, useEffect } from 'react'
import { useTheme } from '@react-navigation/native'

import CCard from '../../components/CCard'
import CButton from '../../components/CButton'
import Logo from '../../components/Logo'
import type { ITodo } from '../../types/appTypes'
import { onGetTodos } from '../../redux/actionCreators/todoActions'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'

export default function TodosScreen() {
  const dispatch = useAppDispatch()
  const changedData: ITodo[] = useAppSelector((state) => state.todos)
  const [data, SetData]: [data: ITodo[] | [], SetData: Function] = useState(useAppSelector((state) => state.todos))

  useEffect(() => {
    dispatch(onGetTodos())

    return () => {
      SetData(changedData)
    }
  }, [dispatch, SetData, changedData])

  return (
    <View style={{marginBottom:50}}>
      <Logo />
      <FlatList data={data} renderItem={({ item }: { item: ITodo }) => <TodoCard key={item._id} item={item} />} />
      
    </View>
  )
}

const TodoCard = ({ item }: { item: ITodo }) => {
  const navigation = useNavigation()
  const { colors } = useTheme()
  return (
    <CCard>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: colors.text,
            fontWeight: 'bold',
            fontSize: 21,
            width: '60%',
          }}
        >
          {item.title}
        </Text>
        <Switch disabled={true} trackColor={{ false: '#767577', true: '#81b0ff' }} value={Boolean(item.isCompleted)} />
        <CButton
          onPress={() => {
            navigation.navigate('TodoDetails', { todo: item })
          }}
          title={'Open'}
        />
      </View>
    </CCard>
  )
}
