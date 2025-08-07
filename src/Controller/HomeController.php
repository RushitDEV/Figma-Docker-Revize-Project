<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

class HomeController extends AbstractController
{
    #[Route('/{_locale}', name: 'app_home', requirements: ['_locale' => 'tr|en'])]
    public function index(): Response
    {
        return $this->render('home/index.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }

    #[Route('/lang/{_locale}', name: '_locale_switcher', requirements: ['_locale' => 'tr|en'])]
    public function switchLocale(Request $request, string $_locale): Response
    {
        // Session'a seçilen dilin kaydedilmesi.
        $request->getSession()->set('_locale', $_locale);

        // Kullanıcıyı, geldiği sayfaya geri yönlendirme.
        $referer = $request->headers->get('referer');
        if ($referer) {
            return $this->redirect($referer);
        }

        // Eğer referans URL yoksa, varsayılan olarak ana sayfaya yönlendirme.
        return $this->redirectToRoute('app_home');
    }
}
