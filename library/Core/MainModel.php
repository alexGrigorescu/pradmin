<?php 
abstract class Core_MainModel {

	private $_dbTable;
	private static $_db;

	public function __construct($dbTable, $id = null)
	{
		$this->setDbTable($dbTable);
		if ($id) {
			$this->getById($id);
		}		
	}
	
	protected function setDB(){
		$bootstrap = Zend_Controller_Front::getInstance()->getParam('bootstrap');
		$options = $bootstrap->getOptions();
		$dbData = $options['resources']['db']['params'];
		$db = Zend_Db::factory('PDO_MYSQL', array(
			'host'     => $dbData['host'],
			'username' => $dbData['username'],
			'password' => $dbData['password'],
			'dbname'   => $dbData['dbname'],
		));
		self::$_db = $db;
	}
	
	public static function getDB(){
		
		if(!isset(self::$_db)){
			self::setDB();
		}
		return self::$_db;
	}

    public function getDbTable()
    {
        return $this->_dbTable;
    }
	
    public function setDbTable($dbTable)
    {
        if (is_string($dbTable)) {
            $dbTable = new $dbTable();
        }
        if (!$dbTable instanceof Zend_Db_Table_Abstract) {
            throw new Exception('Invalid table data gateway provided');
        }
        $this->_dbTable = $dbTable;
        return $this;
    }
	
	public function fetchAll($asArray = false)
	{
		
		return ($asArray)? $this->getDbTable()->fetchAll()->toArray() : $this->getDbTable()->fetchAll();
	}
	
	protected function filterAttributes($values)
	{
		$keys = array_keys($values);
		foreach ($keys as $key) {
			if (!$this->hasAttribute($key)) {
				unset($values[$key]);
			}
		}
		return $values;
	}
	
	protected function getAttribute($attr)
	{
		return $this->$attr;
	}

	protected function getAttributes()
	{
		return get_object_vars($this);
	}

    public function getById($id)
    {
        $result = $this->getDbTable()->find($id);
        if (0 == count($result)) {
            return false;
        }
		$this->setAttributes($result->current());
		return true;
    }
	
	protected function hasAttribute($attr)
	{
		return property_exists(get_class($this), $attr);
	}
	
	protected function setAttribute($attr, $value) 
	{
		if($this->hasAttribute($attr)) {
			$this->$attr = $value;
		}
	}

	protected function setAttributes($data) 
	{
		foreach ($data as $key => $value) {
			$this->setAttribute($key, $value);
		}
	}	
}
?>