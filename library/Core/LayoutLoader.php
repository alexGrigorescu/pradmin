<?php
	class Core_LayoutLoader
	extends Zend_Controller_Action_Helper_Abstract
	{

		public function preDispatch()
		{
			$bootstrap = $this->getActionController()
							 ->getInvokeArg('bootstrap');
			$config = $bootstrap->getOptions();
			$module = $this->getRequest()->getModuleName();
			if (isset($config['resources']['layout']['layout'][$module])) {
				$layoutScript = $config['resources']['layout']['layout'][$module];
			}else{
				$layoutScript = $config['resources']['layout']['layout']['default'];
			}
			$this->getActionController()
					 ->getHelper('layout')
					 ->setLayout($layoutScript);
		}

	}
?>
