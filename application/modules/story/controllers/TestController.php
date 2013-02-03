<?php

class Story_TestController extends Core_MainController {

    public function indexAction(){
        $this->_helper->redirector('test', 'test');
    }

    public function testAction(){
        $model = new Story_Model_Test();
        $this->view->list = $model->test();

    }

}

