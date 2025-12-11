import { AfterViewInit, Component, inject, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { PlatformService } from '@share/service/platform.service';
import { ThemeSwitcher } from './themeswitcher';
import { MegaMenuItem, MessageService } from 'primeng/api';
import { SharedModule } from '@share/module/shared.module';
import { Oclock } from "./oclock/oclock";
import { DeviceService } from '@share/service/device-service';
import { Sidebar } from './sidebar/sidebar';
import { MegaMenu } from 'primeng/megamenu';
import { Login } from "../auth/login/login";
import { ShareDataService } from '@share/service/share-data.service';
import { ShoppingListService } from '@share/service/shopping-list.service';
import { Router } from '@angular/router';

declare var particlesJS: any;

@Component({
    selector: 'app-header',
    imports: [
        ThemeSwitcher,
        SharedModule,
        Oclock,
        Sidebar,
        Login
    ],
    templateUrl: './header.html',
    styleUrl: './header.scss'
})
export class Header implements OnInit, AfterViewInit, OnDestroy {
    private platformService = inject(PlatformService);
    private deviceService = inject(DeviceService);
    private renderer = inject(Renderer2);
    private shareDataService = inject(ShareDataService);
    private shoppingListService = inject(ShoppingListService);
    private meesageService = inject(MessageService);
    private router = inject(Router);

    @ViewChild('mega') megaMenu!: MegaMenu;
    @ViewChild(Sidebar) sidebar!: Sidebar;
    @ViewChild('loginComp') loginComp!: Login;

    items: MegaMenuItem[] | undefined;
    isShowSidbar = false;

    private intervalId: any;
    private texts = ['محصولات', 'طلای زینتی', 'شمش نقره', 'طلای آب شده'];
    private index = 0;

    hasItemsInShoppingList: boolean = false;

    ngOnInit() {
        if (this.platformService.isBrowser()) {
            this.shareDataService.changeThemeColor$.subscribe(() => {
                this.loadParticles();
            });

            this.shareDataService.shoppingListChanged$.subscribe(() => {
                this.checkCart();
            });

            if (this.deviceService.isTablet() || this.deviceService.isMobile()) {
                this.items = undefined;
                this.isShowSidbar = true;
            } else {
                this.items = [
                    {
                        label: 'خانه',
                        icon: 'pi pi-home',
                        routerLink: '/'
                    },
                    {
                        label: 'محصولات',
                        icon: 'pi pi-shopping-cart',
                        items: [
                            [
                                {
                                    label: 'طلای زینتی',
                                    items: [
                                        { label: 'گردنبند طلا', routerLink: '/gold/jewelry/necklaces' },
                                        { label: 'دستبند طلا', routerLink: '/gold/jewelry/bracelets' },
                                        { label: 'گوشواره طلا', routerLink: '/gold/jewelry/earrings' },
                                        { label: 'انگشتر طلا', routerLink: '/gold/jewelry/rings' },
                                        { label: 'پابند طلا', routerLink: '/gold/jewelry/anklets' },
                                        { label: 'سرویس کامل طلا', routerLink: '/gold/jewelry/sets' },
                                        { label: 'حلقه ازدواج', routerLink: '/gold/jewelry/wedding-rings' },
                                        { label: 'زنجیر طلا', routerLink: '/gold/jewelry/chains' },
                                    ],
                                },
                            ],
                            [
                                {
                                    label: 'طلای آب شده',
                                    items: [
                                        { label: 'پلاک 2.5 گرمی', routerLink: '/gold/melted/2-5g' },
                                        { label: 'پلاک 5 گرمی', routerLink: '/gold/melted/5g' },
                                        { label: 'پلاک 10 گرمی', routerLink: '/gold/melted/10g' },
                                    ],
                                },
                            ],
                            [
                                {
                                    label: 'شمش نقره',
                                    items: [
                                        { label: '500 گرمی', routerLink: '/silver/bars/500g' },
                                        { label: '1000 گرمی', routerLink: '/silver/bars/1000g' },
                                    ],
                                },
                            ],
                        ],
                    },
                    {
                        label: 'علاقه مندی ها',
                        icon: 'pi pi-heart',
                        command: () => {
                            const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
                            if (wishlist.length === 0) {
                                this.meesageService.add({ severity: 'info', detail: 'محصولی در لیست علاقه مندی ها وجود ندارد' });
                            } else {
                                this.router.navigate(['/favorites-list']);
                            }
                        }
                    },
                    {
                        label: 'پیگیری سفارش',
                        icon: 'pi pi-box',
                        routerLink: '/orders/track'
                    },
                    {
                        label: 'نمایندگی ها',
                        icon: 'pi pi-building',
                        routerLink: '/representations'
                    },
                    {
                        label: 'تماس با ما',
                        icon: 'pi pi-phone',
                        routerLink: '/contact-us'
                    },
                ];
            }
        }
    }

    ngAfterViewInit(): void {
        if (this.platformService.isBrowser()) {
            this.loadParticles();
            // change product name
            const elements = document.querySelectorAll('.p-megamenu-item-content .p-megamenu-item-label');
            elements.forEach(el => {
                if (el.textContent?.trim() === 'محصولات') {
                    this.renderer.setStyle(el, 'display', 'inline-block');
                    this.renderer.setStyle(el, 'transition', 'transform 0.5s ease, opacity 0.5s ease');

                    if (this.deviceService.isMobile()) {
                        this.renderer.setStyle(el, 'min-width', '65px');
                    } else {
                        this.renderer.setStyle(el, 'min-width', '80px');
                    }
                    this.renderer.setStyle(el, 'text-align', 'center');

                    this.intervalId = setInterval(() => {
                        this.renderer.setStyle(el, 'transform', 'translateY(-20px)');
                        this.renderer.setStyle(el, 'opacity', '0');

                        setTimeout(() => {
                            this.index = (this.index + 1) % this.texts.length;
                            el.textContent = this.texts[this.index];

                            this.renderer.setStyle(el, 'transform', 'translateY(20px)');

                            setTimeout(() => {
                                this.renderer.setStyle(el, 'transform', 'translateY(0)');
                                this.renderer.setStyle(el, 'opacity', '1');
                            }, 50);
                        }, 500);
                    }, 3000);
                }
            });

            // open megamenu on hover
            const overlayItem = this.megaMenu.el.nativeElement.querySelector('.p-megamenu .p-megamenu-item:nth-child(2)');
            const overlay = this.megaMenu.el.nativeElement.querySelector('.p-megamenu-overlay');
            if (overlayItem && overlay) {
                overlayItem.addEventListener('mouseenter', () => {
                    this.renderer.setStyle(overlayItem.querySelector('svg'), 'transform', 'rotate(180deg)');
                    this.renderer.setStyle(overlay, 'display', 'block');
                });
                overlayItem.addEventListener('mouseleave', () => {
                    this.renderer.setStyle(overlayItem.querySelector('svg'), 'transform', 'rotate(0deg)');
                    this.renderer.setStyle(overlay, 'display', 'none');
                });
                overlayItem.addEventListener('click', () => {
                    if (overlay.style.display === 'block') {
                        this.renderer.setStyle(overlayItem.querySelector('svg'), 'transform', 'rotate(0deg)');
                        this.renderer.setStyle(overlay, 'display', 'none');
                    } else {
                        this.renderer.setStyle(overlayItem.querySelector('svg'), 'transform', 'rotate(180deg)');
                        this.renderer.setStyle(overlay, 'display', 'block');
                    }
                });
            }
        }
    }

    ngOnDestroy(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    openSidebar() {
        this.sidebar.openSidebar();
    }

    loadParticles() {
        if (this.platformService.isServer()) return;
        let themeState: any = {};
        try {
            themeState = JSON.parse(localStorage.getItem('themeSwitcherState') || '{}');
        } catch (e) {
            console.error('خطا در خواندن themeSwitcherState از localStorage', e);
        }

        // مقدار پیشفرض
        let goldColor = '#ffffff';

        // تعیین مقدار goldColor بر اساس primary
        switch (themeState.primary) {
            case 'yellow':
                goldColor = '#FFD700';
                break;
            case 'amber':
                goldColor = '#FFBF00';
                break;
            case 'lime':
                goldColor = '#A6CE39';
                break;
            case 'green':
                goldColor = '#22C55E';
                break;
            case 'emerald':
                goldColor = '#10B981';
                break;
            case 'teal':
                goldColor = '#14B8A6';
                break;
            case 'cyan':
                goldColor = '#06B6D4';
                break;
            case 'sky':
                goldColor = '#0EA5E9';
                break;
            case 'blue':
                goldColor = '#3B82F6';
                break;
            case 'indigo':
                goldColor = '#6366F1';
                break;
            case 'violet':
                goldColor = '#8B5CF6';
                break;
            case 'purple':
                goldColor = '#A855F7';
                break;
            case 'fuchsia':
                goldColor = '#D946EF';
                break;
            case 'pink':
                goldColor = '#EC4899';
                break;
            case 'rose':
                goldColor = '#F43F5E';
                break;
            case 'orange':
                goldColor = '#fb923c';
                break;
            case 'noir':
                goldColor = '#ececec';
                break;
            default:
                goldColor = '#FFD700'; // مقدار پیشفرض طلایی  

        }

        // حالا goldColor آماده استفاده است
        console.log('Gold color:', goldColor);

        // اگر می‌خوای در particles.js استفاده شود:
        const file = this.deviceService.isMobile()
            ? '/library/particlesInMobile.json'
            : '/library/particles.json';

        fetch(file)
            .then(res => res.json())
            .then(config => {
                config.particles.color.value = goldColor;
                if (config.particles.line_linked) {
                    config.particles.line_linked.color = goldColor;
                }
                particlesJS('particles', config);
            })
            .catch(err => console.error(err));
    }

    checkCart() {
        const list = this.shoppingListService.getList();
        this.hasItemsInShoppingList = list.length > 0;
    }

    onShoppingCartClick() {
        if (this.hasItemsInShoppingList) {
            this.router.navigate(['/shopping-list']);
        } else {
            this.meesageService.add({ severity: 'info', detail: 'محصولی در سبد خرید وجود ندارد' });
        }
    }
}