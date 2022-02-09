from flask import Flask, request, json, jsonify
import time
import MySQLdb

app = Flask(__name__)

def registermysqlMethod(dict):
    # 通过获取到的数据库连接conn下的cursor()方法来创建游标。
    db = MySQLdb.connect(
        host='localhost',
        port=3306,
        user='root',
        passwd='mysql2021',
        db='test',
    )
    cursor = db.cursor()
    sql = "INSERT INTO user(username,password,email) VALUES (%s,%s,%s);"
    try:
        # 执行SQL语句
        cursor.execute(sql, (dict['username'], dict['password'], dict['email']))
        db.commit()
        return "1"
    except:
        print("Error: unable to fecth data")
        return "0"
    # 关闭数据库连接
    db.close()

def loginMysql(dict):
    db = MySQLdb.connect(
        host='localhost',
        port=3306,
        user='root',
        passwd='mysql2021',
        db='test',
    )
    cursor = db.cursor()
    username = (dict['username'],)
    sql = "SELECT * FROM user WHERE username = %s "
    statue = '0'
    try:
        # 执行SQL语句
        cursor.execute(sql, username)
        results = cursor.fetchall()
        password = results[0][2]
        if (password == dict['password']):
            # return "Correct password"
            statue = '1'
        else:
            statue = '2'
    except:
        statue ='0'
    # 关闭数据库连接
    db.close()
    return statue

def forgetPassword(dict):
    db = MySQLdb.connect(
        host='localhost',
        port=3306,
        user='root',
        passwd='mysql2021',
        db='test',
    )
    cursor = db.cursor()
    sql = "UPDATE user SET password=%s, remember = 0 WHERE email = %s and username = %s  "
    par = (dict['password'], dict['email'], dict['username'],)
    try:
        # 执行SQL语句
        cursor.execute(sql, par)
        db.commit()
        return '1'
    except:
        return '0'
# 关闭数据库连接
    db.close()

def checkUserLike(dict):
    db = MySQLdb.connect(
        host='localhost',
        port=3306,
        user='root',
        passwd='mysql2021',
        db='test',
    )
    cursor = db.cursor()
    sqlInsert = "INSERT INTO userlike(username,movieid,movietitle,type,poster,movielike,date,vote) VALUES (%s,%s,%s,%s,%s,%s,%s,%s); "
    parInsert = (
    dict['username'], dict['MovieId'], dict['title'], dict['Type'], dict['poster'], dict['Like'], dict['date'],dict['vote'],)
    sqlSe = "SELECT * FROM userlike WHERE  movieid = %s"
    parSe = (dict['MovieId'],)
    sqlUp = "UPDATE userlike SET movielike=%s WHERE movieid = %s"
    parUp = (dict['Like'], dict['MovieId'],)
    try:
        # 执行SQL语句
        cursor.execute(sqlSe, parSe)
        results = cursor.fetchall()
        if (results):
            print(results[0][0])
            cursor.execute(sqlUp, parUp)
            db.commit()
            print("Finish Update")
            return '2'
        else:
            cursor.execute(sqlInsert, parInsert)
            db.commit()
            print("Finish Insert")
            return '1'
    except:
        return '0'
        # 关闭数据库连接
    db.close()


def movieLike(dict):
    db = MySQLdb.connect(
        host='localhost',
        port=3306,
        user='root',
        passwd='mysql2021',
        db='test',
    )
    cursor = db.cursor()
    par = (dict['Movietitle'],)
    sql = "SELECT movielike FROM userlike WHERE movietitle = %s "
    movielike = False
    try:
        # 执行SQL语句
        cursor.execute(sql, par)
        results = cursor.fetchall()
        data = results[0][0]
        if(data==0):
            movielike = False
        elif(data==1):
            movielike = True
    except:
        return 'wrong'
    # 关闭数据库连接
    db.close()
    return movielike

def getMylike(dict):
    db = MySQLdb.connect(
        host='localhost',
        port=3306,
        user='root',
        passwd='mysql2021',
        db='test',
    )
    cursor = db.cursor()
    selectsql = "SELECT * FROM userlike WHERE username = %s and movielike=%s"
    parSele = (dict['username'],1,)
    try:
        # 执行SQL语句
        cursor.execute(selectsql, parSele)
        results = cursor.fetchall()
        data = results[0][0]
        print(data)
    except:
        return 'wrong'
    # 关闭数据库连接
    db.close()
    return results

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/register',methods = ['POST'])
def register():
    incoming = request.get_data()
    json_file = json.loads(incoming)
    # print(json_file['username'])
    print(json_file['username'])
    status = registermysqlMethod(json_file)
    return status

@app.route('/login',methods = ['POST'])
def login():
    incoming = request.get_data()
    json_file = json.loads(incoming)
    print(json_file['username'])
    status = loginMysql(json_file)
    return status

@app.route('/forget',methods = ['POST'])
def forget():
    incoming = request.get_data()
    json_file = json.loads(incoming)
    print(json_file['username'])
    status = forgetPassword(json_file)
    return status

@app.route('/like',methods = ['POST'])
def like():
    incoming = request.get_data()
    json_file = json.loads(incoming)
    print(json_file['username'])
    print('-----------')
    print(json_file)
    status = checkUserLike(json_file)
    return status

@app.route('/movielike',methods = ['POST'])
def movielike():
    incoming = request.get_data()
    json_file = json.loads(incoming)
    print(json_file)
    status = movieLike(json_file)
    print(status)
    result = str(status)
    return result

@app.route('/mylike',methods = ['POST'])
def mylike():
    incoming = request.get_data()
    json_file = json.loads(incoming)
    print(json_file)
    status = getMylike(json_file)
    results = json.dumps(status)
    return results


if __name__ == '__main__':
    app.run(debug=True)
