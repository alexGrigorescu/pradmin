<?php

class Story_CristiController extends Core_MainController {

    public function indexAction(){
        $this->_helper->redirector('home', 'cristi');
    }

    public function homeAction(){
        $model = new Story_Model_Testcristi();
        $this->view->cristi = $model->test();

    }

}

