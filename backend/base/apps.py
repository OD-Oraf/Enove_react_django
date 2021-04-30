from django.apps import AppConfig


class BaseConfig(AppConfig):
    name = 'base'
    
    #Configure for signal
    def ready(self): 
        import base.signals

