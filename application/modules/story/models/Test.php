<?php

class Story_Model_ extends Core_MainModel
{
    public function __construct() {
        $this->setDB();
    }

    public function test(){

        $select = $this->getDB()
            ->select()
            ->from(array('p' => 'products'))
            ->join(array('c' => 'categories'), 'p.category_id = c.id')
            ->where("p.name like ?", "a%")
            ->order('p.id DESC');

        $result = $this->getDB()->fetchAll($select);

        return $result;
    }

}