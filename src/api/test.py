import pandas as pd
from sqlalchemy import create_engine
import pymysql
import MySQLdb

# engine = create_engine('mysql+pymysql://root:mysql2021@localhost:3306/test')
# sql_query = 'select * from user;'
# # 使用pandas的read_sql_query函数执行SQL语句，并存入DataFrame
# df_read = pd.read_sql_query(sql_query, engine)
# df_write = pd.DataFrame({ 'username': ['ddd', 'sss', 'llf', 'aaa'], 'remember': [0, 1, 1, 1]})
# df_write.to_sql('test', engine, index=False)
# print(df_read)
db = MySQLdb.connect(
    host='localhost',
    port=3306,
    user='root',
    passwd='mysql2021',
    db='test',
)
# 通过获取到的数据库连接conn下的cursor()方法来创建游标。
cursor = db.cursor()
dict={'username': 'admin', 'title': 'Spider-Man: No Way Home', 'rate': 2.5}
# dict = {'username': 'admin', 'MovieId': '123', 'Like': True, 'Type': 'movie', 'title': 'Spider-Man: No Way Home', 'date': '2021-12-15', 'poster': '/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg', 'vote': '8.4'}
# sqlInsert = "INSERT INTO userlike(username,movieid,movietitle,type,poster,movielike,date,vote) VALUES (%s,%s,%s,%s,%s,%s,%s,%s); "
# parInsert = (dict['username'], dict['MovieId'], dict['title'], dict['Type'], dict['poster'], dict['Like'], dict['date'],
#              dict['vote'],)
selectsql = "SELECT netflix,amazon FROM user WHERE username = %s"
parSele = (dict['username'],)

# parSe = (dict['MovieId'],)
# sqlUp = "UPDATE userlike SET movielike=%s WHERE movieid = %s"
# parUp = (dict['Like'], dict['MovieId'],)
# selectsql = "SELECT * FROM userlike WHERE username = %s"
# parSele = (dict['username'],)
try:
    # 执行SQL语句
    cursor.execute(selectsql, parSele)
    results = cursor.fetchall()
    data = results[0][0]
    print(data)

except MySQLdb.Error as e:
    print(e)
db.close()
