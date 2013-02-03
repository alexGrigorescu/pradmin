<?php

class Story_AdrianController extends Core_MainController {

    public function indexAction(){
        $this->_helper->redirector('list', 'adrian');
    }

    public function listAction(){

        $model = new Story_Model_Adrian();
        $this->view->list = $model->adi();

    }

}

