import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Text,
  Heading,
  VStack
} from '@chakra-ui/react';
import { Formik} from 'formik';

function App() {
  const [bgColor, setBgColor] = useState("yellow");
  const [data, setData] = useState([]);

  const handleCheckboxChange = async (itemId) => {
    const updatedData = data.map((item) => {
      if (item.id === itemId) {
        const updatedItem = { ...item, isDone: !item.isDone };
        return updatedItem;
      }
      return item;
    });

    try {
      const response = await fetch(`/note/${itemId}/isDone`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isDone: updatedData.find((item) => item.id === itemId).isDone })
      });

      if (response.ok) {

        setData(updatedData);
      }
    } catch (error) {
    }
  };

  const handleDelete = async (itemId) => {
    try {
      const response = await fetch(`/note/${itemId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const updatedData = data.filter((item) => item.id !== itemId);
        setData(updatedData);
        alert("sikeres törlés")
      }
    } catch (error) {
    }
  };

  const yellowColour = () => {
    setBgColor("yellow");
  };
  const blueColour = () => {
    setBgColor("blue");
  };
  const greenColour = () => {
    setBgColor("green");
  };
  const redColour = () => {
    setBgColor("red");
  };

  useEffect(() => {
    fetch('/note', {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        setData(data.note.items);
      })
      .catch(error => {
        console.error('Hiba történt:', error);
      });
  }, []);

  return (
    <Flex bgImage="https://th.bing.com/th/id/R.1dbe78894bb352d10985eda24a7f03ed?rik=G%2bIEkU4HKqz9ew&riu=http%3a%2f%2fwallpapercave.com%2fwp%2flZiQPYS.jpg&ehk=z5Gqp1hLg8Vss%2fnGv1RUJlMdP75YmN8lbr6fWV9R7OA%3d&risl=&pid=ImgRaw&r=0" align="center" justify="center" >
      <Box style={{ background: bgColor }} p={6} width="60vh" borderWidth={1} borderRadius={8}>
        <Box textAlign={"flex-start"}>
          <Heading color='black'>
            Todo List
          </Heading>
        </Box>
        <Formik initialValues={{}}>
          {() => (
            <Box>
              <Flex justify="flex-end" align="flex-end">
                <Button marginRight="1vh" sx={{ width: '3vh', height: '3vh', background: 'yellow' }} onClick={yellowColour}></Button>
                <Button marginRight="1vh" sx={{ width: '3vh', height: '3vh', background: 'green' }} onClick={greenColour}></Button>
                <Button marginRight="1vh" sx={{ width: '3vh', height: '3vh', background: 'blue' }} onClick={blueColour}></Button>
                <Button marginRight="1vh" sx={{ width: '3vh', height: '3vh', background: 'red' }} onClick={redColour}></Button>
              </Flex>
              <VStack  align="flex-start" spacing={1}>
                {data.map(item => (
                  <Box  key={item.id} >
                    <Checkbox isChecked={item.isDone} onChange={() => handleCheckboxChange(item.id)
                    }>
                      <Text textDecoration={item.isDone ? 'line-through' : 'none'}>{item.label}</Text>
                    </Checkbox>
                    <Button marginTop={18} cursor={'pointer'} marginLeft={15} onClick={() => handleDelete(item.id)}>X</Button>
                  </Box>
                ))}
              </VStack>
            </Box>
          )}
        </Formik>
      </Box>
    </Flex>
  );
}

export default App;