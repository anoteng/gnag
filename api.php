<?php
class MyDB extends SQLite3 {
    function __construct() {
        $this->open('test.db');
    }
    public array $search;

    function printTable(){
//        $this->search['country'] = 'Brasil';
        $SQL = "SELECT field.*, UNIVERSITY.NAME as university, country.NAME as country FROM field ";
        $SQL .= "INNER JOIN university ON university.id = field.university ";
        $SQL .= "INNER JOIN country ON country.id = university.country";
        if(isset($this->search['country'])){
            $SQL .= " WHERE country.name LIKE '". $this->search['country'] ."%'";
            if(isset($this->search['university'])){
                $SQL .= " AND university.name LIKE '". $this->search['university'] ."%'";
            }
        }elseif(isset($this->search['university'])){
            $SQL .= " WHERE university.name LIKE '". $this->search['university'] ."%'";
        }
        $result = $this->query($SQL);
        $array = [];
        while($row = $result->fetchArray(SQLITE3_ASSOC)){
            $array[] = $row;
        }
        return(json_encode($array));
    }
}
$db = new MyDB();
if(!$db) {
    echo $db->lastErrorMsg();
} else {
    if(isset($_GET['country'])){$db->search['country'] = $_GET['country'];}
    if(isset($_GET['university'])){$db->search['university'] = $_GET['university'];}
    echo($db->printTable());
}
?>