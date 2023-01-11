import React, {useState} from 'react';
import './style.css';

const App = ()=>{
    const[todos,setTodos] = useState([]);　　　　//入力された値を格納する配列
    const[todo,setTodo] = useState('');        //入力された値を格納

    const[isEditing,setIsEditing] = useState(false);   //編集状態か否か
    const[currentTodo,setCurrentTodo] = useState({});　　　//現在の値

    // 入力欄に値を反映させる
    function handleInputChange(e){
        setTodo(e.target.value);
    }

    // 編集機能
    function handleEditInputChange(e){
        setCurrentTodo({...currentTodo,text:e.target.value});
        console.log(currentTodo);
    }

    function handleFormSubmit(e){
        // デフォルトのイベントをしない。⇨再読み込みをしない
        e.preventDefault();

        
        if(todo !== "") {    // 入力された値が空でなかったら
            setTodos([　　
                ...todos,
                {
                    id:todos.length +1,
                    text: todo.trim()
                }
            ]);
        }
        setTodo("");
    }

    // 編集機能
    function handleEditFormSubmit(e){
        e.preventDefault();
        handleUpdateTodo(currentTodo.id,currentTodo);
    }

    // 削除機能
    function handleDeleteClick(id){
        const removeItem = todos.filter((todo) => {
            return todo.id !== id;
        });
        setTodos(removeItem);
    }

    // 更新されたテキストをtodos状態に追加
    function handleUpdateTodo(id,updatedTodo){
        const updatedItem = todos.map((todo) => {
            return todo.id === id ? updatedTodo : todo;
        });
        setIsEditing(false);
        setTodos(updatedItem);
    }

    // 編集ボタンをクリックした時の処理
    function handleEditClick(todo) {
        setIsEditing(true);
        setCurrentTodo({...todo});
    }
    

    return(
        <div className="App">
            <span>TodoList</span>
            {isEditing ? (
                <form onSubmit={handleEditFormSubmit}>
                    <h2>編集する</h2>
                    <label htmlFor="editTodo">編集：</label>
                    <input
                        name="editTodo"
                        type="text"
                        placeholder="Edit todo"
                        value={currentTodo.text}
                        onChange={handleEditInputChange}
                    />
                    <button type="submit">編集を完了する</button>
                    <button onClick={() => setIsEditing(false)}>キャンセル</button>
                </form>
            ): (
                <form onSubmit={handleFormSubmit}>
                    <input
                        name="todo"
                        type="text"
                        placeholder="create new todo"
                        value={todo}
                        onChange={handleInputChange}
                        
                    />
                    <button className="ui primary button">追加</button>
                </form>
                 )}
                
                <ul className="todo-list">
                    {todos.map((todo) =>(
                        <li key={todo.id}>{todo.text}
                        <button onClick={() => handleEditClick(todo)} className="ui red button">編集</button>
                        <button onClick={() => handleDeleteClick(todo.id)} className="ui red button">削除</button>
                        </li>
                    ))}
                </ul>
        </div>
        );
};

export default App;