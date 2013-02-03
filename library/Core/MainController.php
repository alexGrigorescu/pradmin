<?php
abstract class Core_MainController extends Zend_Controller_Action
{
	protected $tpl;
	
    public function init() {
    }
	
	public function securityRules() {
		
	}
	
	public function renderTpl() {
		$this->tpl->show();
		$this->_helper->viewRenderer->setNoRender();
    }

	/**
	 * Common actions to take when the privacy is violated
	 */
	public function redirectToIndex() {
		$this->_helper->redirector('index', 'index');
	}
	
	public function goBack() {
		$referer = $this->getRequest()->getHeader('REFERER'); 
		$this->_redirect($referer);
	}
	
	
	public function restrictedAccess() {
		$session = new Zend_Session_Namespace("session");
		$session->referrer = $this->getRequest()->getPathInfo();		
		$this->_helper->messenger('error', 'restricted_access');
		$this->_helper->redirector('index', 'index');
	}	

	public function permissionError() {
		$this->_helper->messenger('error', 'permission_error');
		$this->_helper->redirector('index', 'index');
	}
}

