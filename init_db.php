<?php
class MyDB extends SQLite3 {
    function __construct() {
        $this->open('test.db');
    }
}
$db = new MyDB();
if(!$db) {
    echo $db->lastErrorMsg();
} else {
    echo "Opened database successfully\n";
}
$sql =<<<EOF
      CREATE TABLE country
      (ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      NAME           TEXT    NOT NULL,
      SHORT TEXT);
EOF;

$ret = $db->exec($sql);
if(!$ret){
    echo $db->lastErrorMsg();
} else {
    echo "Table created successfully\n";
}
$sql =<<<EOF
      CREATE TABLE university
      (ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      NAME           TEXT    NOT NULL,
      COUNTRY INTEGER NOT NULL,
      ACCRED INTEGER DEFAULT NULL,
      FOREIGN KEY (COUNTRY) references country(ID));
EOF;

$ret = $db->exec($sql);
if(!$ret){
    echo $db->lastErrorMsg();
} else {
    echo "Table created successfully\n";
}
$sql =<<<EOF
      CREATE TABLE field
      (ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      NAME TEXT DEFAULT "Alle" NOT NULL,
      ECTS_BSC TEXT,
      ECTS_MSC TEXT,
      COMMENT TEXT,
      IV_COMMENT TEXT,
      CHANGED_BY TEXT,
      LAST_CHANGED INTEGER,
      UNIVERSITY INTEGER NOT NULL,
      foreign key (UNIVERSITY) references university(ID));
EOF;

$ret = $db->exec($sql);
if(!$ret){
    echo $db->lastErrorMsg();
} else {
    echo "Table created successfully\n";
}
$db->close();
?>