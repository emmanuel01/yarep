from django.conf.urls import url, include
from django.conf.urls.static import static
from django.conf import settings
from django.views.generic import TemplateView

from django.contrib import admin
admin.autodiscover()


urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', TemplateView.as_view(
        template_name='core/home.html'), name="home"),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)