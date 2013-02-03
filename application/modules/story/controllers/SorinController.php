<?php

class Story_SorinController extends Core_MainController {

    public function indexAction(){
        $this->_helper->redirector('test', 'sorin');
    }

    public function testAction(){

        $model = new Story_Model_Sorin();
        $this->view->test = $model->test2();

    }

}