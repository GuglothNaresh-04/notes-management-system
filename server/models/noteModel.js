const db = require("../config/database");

exports.createNote = (userId, title, content) => {
    return new Promise((resolve, reject) => {
        db.run(
            "INSERT INTO notes(user_id,title,content) VALUES(?,?,?)",
            [userId, title, content],
            function(err){
                if(err) reject(err);
                else resolve(this.lastID);
            }
        );
    });
};

exports.getNotes = (userId)=>{
    return new Promise((resolve,reject)=>{
        db.all(
            "SELECT * FROM notes WHERE user_id=?",
            [userId],
            (err,rows)=>{
                if(err) reject(err);
                else resolve(rows);
            }
        );
    });
};

exports.updateNote=(id,userId,title,content)=>{
    return new Promise((resolve,reject)=>{
        db.run(
            "UPDATE notes SET title=?,content=? WHERE id=? AND user_id=?",
            [title,content,id,userId],
            function(err){
                if(err) reject(err);
                else resolve(this.changes);
            }
        );
    });
};

exports.deleteNote=(id,userId)=>{
    return new Promise((resolve,reject)=>{
        db.run(
            "DELETE FROM notes WHERE id=? AND user_id=?",
            [id,userId],
            function(err){
                if(err) reject(err);
                else resolve(this.changes);
            }
        );
    });
};