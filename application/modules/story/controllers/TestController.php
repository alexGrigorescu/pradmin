<?php

class Story_TestController extends Core_MainController {

    public function indexAction(){
        $this->_helper->redirector('list', 'test');
    }

    public function listAction(){
        $model = new Story_Model_Test();
        $list = $model->test();

    }

}

