import React, { Fragment, useContext } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Edit';
import AlertContext from '../../context/alert/alertContext';
import Alerts from './Alerts';

import { useQuery, useMutation, gql } from '@apollo/client';

const GET_TODOS = gql`
  query {
    todos {
      id
      title
      is_completed
    }
  }
`;

// toggle todos
const TOGGLE_TODOS = gql`
  mutation toggleTodo($id: uuid, $is_completed: Boolean!) {
    update_todos(
      where: { id: { _eq: $id } }
      _set: { is_completed: $is_completed }
    ) {
      returning {
        id
        is_completed
        title
      }
    }
  }
`;

const Todos = () => {
  const { setAlert, alerts } = useContext(AlertContext);

  const { data, loading, error } = useQuery(GET_TODOS);

  const [toggleTodo, {}] = useMutation(TOGGLE_TODOS);

  // CHECK is_completed
  const handleToggle =
    ({ id, is_completed }) =>
    () => {
      setAlert('Loading...', 'primary');
      toggleTodo({
        variables: { id, is_completed: !is_completed },
      });
      // setAlert(null);
    };

  if (error) {
    setAlert('Something went wrong...', 'danger');
  }

  if (loading) return <div>Loading todos</div>;

  return (
    <Fragment>
      {alerts && <Alerts />}
      <List sx={{ width: '100%', maxWidth: '100%', bgcolor: '#f9f7f7' }}>
        {data.todos.map(todo => {
          const labelId = todo.id;
          return (
            <ListItem
              key={todo.id}
              secondaryAction={
                <IconButton edge='end' aria-label='comments'>
                  <CommentIcon />
                </IconButton>
              }
              disablePadding>
              <ListItemButton
                role={undefined}
                onClick={handleToggle(todo)}
                dense>
                <ListItemIcon>
                  <Checkbox
                    edge='start'
                    checked={todo.is_completed}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={todo.title} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Fragment>
  );
};

export default Todos;
